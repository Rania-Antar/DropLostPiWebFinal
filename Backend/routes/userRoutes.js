const router = require("express").Router();
const authMiddleWares = require("../middlewaresAndValidators/authMiddleWares");
const userValidators = require("../middlewaresAndValidators/userValidators");
const userController = require("../controllers/usersController");
const uploadFileMiddleWares = require("../middlewaresAndValidators/UploadFileMiddleWares");

const uploadFileValidators = require("../middlewaresAndValidators/UploadFileValidators");

router.put(
  "/updateProfile",
  authMiddleWares.authenticateAndLoadUser,
  userValidators.updateProfile,
  userController.updateProfile
);
router.put(
  "/updatePassword",
  authMiddleWares.authenticateAndLoadUser,
  userValidators.updatePassword,
  userController.updatePassword
);
router.put(
  "/updateProfileImage",
  authMiddleWares.authenticateAndLoadUser,

  uploadFileMiddleWares.uploadFileByName("image"),
  uploadFileValidators.fileExistsValidator,
  userController.updateProfileImage
);

router.put(
  "/demote/:id",
  userValidators.demoteUserValidator,
  userController.demoteUser
);

router.put(
  "/promote/:id",
  userValidators.promoteUserValidator,
  userController.promoteUser
);

router.put("/ban/:id", userValidators.banUserValidator, userController.banUser);

router.put(
  "/releaseBan/:id",
  authMiddleWares.authenticateAndLoadUser,
  userController.releaseBannedUser
);

router.get(
  "/",

  userController.getUsers
);

router.get(
  "/:id",
  userValidators.getUserByIdValidator,
  userController.getUserById
);

router.delete(
  "/:id",
  userValidators.deleteUserValidator,
  userController.deleteUserById
);

module.exports = router;
