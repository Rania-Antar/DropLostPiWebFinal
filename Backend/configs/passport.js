const userModel = require("../models/userModel");
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;

const keys = require("./keys_dev");

const { Strategy: LocalStrategy } = require("passport-local");
const { Strategy: FacebookStrategy } = require("passport-facebook");
const config = require("./config");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const moment = require("moment");

const passportJwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
  secretOrKey: keys.JWT_SECRET,
};

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
  passport.use(
    "jwt-load-user",
    new JwtStrategy(passportJwtOptions, async function (jwt_payload, done) {
      const user = await userModel
        .findOne({
          _id: jwt_payload.id,
        })
        .exec();

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
  );

  passport.use(
    "jwt-only",
    new JwtStrategy(passportJwtOptions, async function (jwt_payload, done) {
      if (jwt_payload) {
        return done(null, jwt_payload);
      } else {
        return done(null, false);
      }
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
          userModel.findOne({ facebook: profile.id }, (err, existingUser) => {
            if (err) {
              return done(err);
            }
            if (existingUser) {
              done(null, existingUser);
            } else {
              userModel.findById(req.user.id, (err, user) => {
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
          userModel.findOne({ facebook: profile.id }, (err, existingUser) => {
            if (err) {
              return done(err);
            }
            if (existingUser) {
              return done(null, existingUser);
            }
            userModel.findOne(
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
                  user.firstName =
                    user.firstName || `${profile.name.givenName} `;
                  user.lastName =
                    user.lastName || ` ${profile.name.familyName}`;
                  user.gender = profile._json.gender;
                  user.picture = `https://graph.facebook.com/${profile.id}/picture?type=large`;
                  // user.profile.location = (profile._json.location) ? profile._json.location.name : '';
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
};
