module.exports = {
  USER_ROLES: {
    CLIENT: "CLIENT",
    ADMIN: "ADMIN",
    EMPLOYEE: "EMPLOYEE",
    ANONYMOUS: "ANONYMOUS",
  },
  TOKEN_TYPES: {
    ACCOUNT_ACTIVATION: "ACCOUNT_ACTIVATION",
    RESET_PASSWORD: "RESET_PASSWORD",
  },
  JWT_SECRET: "JWT_SECRET",
  SALT_VALUE: 10,
  MONGODB_CONNEXTION: "mongodb://localhost:27017/piweb",
  // "mongodb+srv://admin:admin@ehr-roxao.mongodb.net/ehr?retryWrites=true",

  EMAIL: {
    GMAIL_CONFIGURATIONS: {
      EMAIL_ADRESSE: "esprit.ehr@gmail.com",
      EMAIL_PASSWORD: "raniaesprit",
      EMAIL_SERVICE: "gmail",
    },
    EMAIL_REASON: {
      ACCOUNT_ACTIVATION: "ACCOUNT_ACTIVATION",
      ACCOUNT_ACTIVATION_BLOGER: "ACCOUNT_ACTIVATION_BLOGER",
      ACCOUNT_ACTIVATION_ADMIN: "ACCOUNT_ACTIVATION_ADMIN",
      RESET_PASSWORD: "RESET_PASSWORD",
    },
  },
};
