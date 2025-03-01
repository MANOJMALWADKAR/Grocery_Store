const express = require("express");
const { registerUser,
    loginUser,
    logout,
    forgotPassword,
    resetPassword,
    getUserDetails,
    updatePassword,
    updateProfile,
    getAllUser,
    getSingleUser,
    updateUserRole,
    deleteUser } = require("../controller/userController");
const { isAunthenticatedUser, authorizeRoles } = require("../middleware/auth");


const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword)

router.route("/logout").get(logout);

router.route("/me").get(isAunthenticatedUser, getUserDetails);

router.route("/password/update").put(isAunthenticatedUser, updatePassword);

router.route("/me/update").put(isAunthenticatedUser, updateProfile);

router.route("/admin/users").get(isAunthenticatedUser, authorizeRoles("admin"), getAllUser);

router.route("/admin/user/:id")
    .get(isAunthenticatedUser, authorizeRoles("admin"), getSingleUser)
    .put(isAunthenticatedUser, authorizeRoles("admin"), updateUserRole)
    .delete(isAunthenticatedUser, authorizeRoles("admin"), deleteUser);




module.exports = router;