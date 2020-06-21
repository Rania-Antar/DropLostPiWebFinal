const passport = require("passport");

const axios = require("axios");
const { Strategy: LocalStrategy } = require("passport-local");
const { Strategy: FacebookStrategy } = require("passport-facebook");
const config = require("./config");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const moment = require("moment");

const User = require("../models/userModel");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

/**
 * Sign in using Email and Password.
 */
passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    User.findOne({ email: email.toLowerCase() }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { msg: `Email ${email} not found.` });
      }
      if (!user.password) {
        return done(null, false, {
          msg:
            "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
        });
      }
      user.comparePassword(password, (err, isMatch) => {
        if (err) {
          return done(err);
        }
        if (isMatch) {
          return done(null, user);
        }
        return done(null, false, { msg: "Invalid email or password." });
      });
    });
  })
);

/**
 * Sign in with Facebook.
 */
passport.use(
  new FacebookStrategy(
    {
      clientID: config.FACEBOOK_ID,
      clientSecret: config.FACEBOOK_SECRET,
      callbackURL: `${config.BASE_URL}/auth/facebook/callback`,
      profileFields: [
        "id",
        "name",
        "displayName",
        "photos",
        "email",
        "link",
        "locale",
        "timezone",
        "gender",
      ],
      passReqToCallback: true,
      enableProof: true,
    },
    (req, accessToken, refreshToken, profile, done) => {
      if (req.user) {
        User.findOne({ facebook: profile.id }, (err, existingUser) => {
          if (err) {
            return done(err);
          }
          if (existingUser) {
            done(null, existingUser);
          } else {
            User.findById(req.user.id, (err, user) => {
              if (err) {
                return done(err);
              }
              user.facebook = profile.id;
              user.tokens.push({ kind: "facebook", accessToken });
              user.firstName = user.firstName || `${profile.name.givenName} `;
              user.lastName = user.lastName || ` ${profile.name.familyName}`;
              user.gender = user.gender || profile._json.gender;
              user.image =
                user.image ||
                `https://graph.facebook.com/${profile.id}/picture?type=large`;
              user.save((err) => {
                done(err, user);
              });
            });
          }
        });
      } else {
        User.findOne({ facebook: profile.id }, (err, existingUser) => {
          if (err) {
            return done(err);
          }
          if (existingUser) {
            return done(null, existingUser);
          }
          User.findOne(
            { email: profile._json.email },
            (err, existingEmailUser) => {
              if (err) {
                return done(err);
              }
              if (existingEmailUser) {
                req.flash("errors", {
                  msg:
                    "There is already an account using this email address. Sign in to that account and link it with Facebook manually from Account Settings.",
                });
                done(err);
              } else {
                const user = new User();
                user.email = profile._json.email;
                user.facebook = profile.id;
                user.tokens.push({ kind: "facebook", accessToken });
                user.firstName = user.firstName || `${profile.name.givenName} `;
                user.lastName = user.lastName || ` ${profile.name.familyName}`;
                user.gender = profile._json.gender;
                user.image = `https://graph.facebook.com/${profile.id}/picture?type=large`;
                user.save((err) => {
                  done(err, user);
                });
              }
            }
          );
        });
      }
    }
  )
);

/**
 * Login Required middleware.
 */
exports.isAuthenticated = (req, res, next) => {
  var token = req.headers["authorization"];
  token = token.replace("Bearer ", "").replace("#_=_", "");
  console.log(token);

  // Check for token
  if (!token)
    return res.status(401).json({ msg: "No token, authorizaton denied" });

  try {
    // Verify token
    const decoded = jwt.verify(token, "secret");
    console.log(decoded);
    // Add user from payload
    req.user = decoded;

    next();
  } catch (e) {
    res.status(400).json({ msg: "Token is not valid" });
  }
};

exports.isSadmin = (req, res, next) => {
  if (req.user.data.sadmin) {
    return next();
  }
  return res.json({ success: false, msg: "unauthorized" });
};
/**
 * Authorization Required middleware.
 */
exports.isAuthorized = (req, res, next) => {
  const provider = req.path.split("/")[2];
  const token = req.user.tokens.find((token) => token.kind === provider);
  if (token) {
    if (
      token.accessTokenExpires &&
      moment(token.accessTokenExpires).isBefore(moment().subtract(1, "minutes"))
    ) {
      if (token.refreshToken) {
        if (
          token.refreshTokenExpires &&
          moment(token.refreshTokenExpires).isBefore(
            moment().subtract(1, "minutes")
          )
        ) {
          res.redirect(`/auth/${provider}`);
        } else {
          refresh.requestNewAccessToken(
            `${provider}`,
            token.refreshToken,
            (err, accessToken, refreshToken, params) => {
              User.findById(req.user.id, (err, user) => {
                user.tokens.some((tokenObject) => {
                  if (tokenObject.kind === provider) {
                    tokenObject.accessToken = accessToken;
                    if (params.expires_in)
                      tokenObject.accessTokenExpires = moment()
                        .add(params.expires_in, "seconds")
                        .format();
                    return true;
                  }
                  return false;
                });
                req.user = user;
                user.markModified("tokens");
                user.save((err) => {
                  if (err) console.log(err);
                  next();
                });
              });
            }
          );
        }
      } else {
        res.redirect(`/auth/${provider}`);
      }
    } else {
      next();
    }
  } else {
    res.redirect(`/auth/${provider}`);
  }
};
