const express = require("express");
const {registerUser, 
    loginUser,
    logout, 
    forgotPassword, 
    resetPassword, 
    getUsersDetails, 
    updatePassword, 
    updateProfile,
    getAllUser,
    getSingleUser,
    updateuserRole,
    deleteUsers} = require("../controllers/userController");
const router = express.Router();
const { isAuthenticationUser,authorizeRoles } = require("../middleware/authen");

//routing for the register the users
router.route("/register").post(registerUser);

//routing for the login the user.
router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

//routing for logout of the user
router.route("/logout").get(logout);

//routing to get the user details
router.route("/me").get(isAuthenticationUser,getUsersDetails);
//routing to update user password
router.route("/password/update").put(isAuthenticationUser,updatePassword);
//routing to update user profile
router.route("/me/update").put(isAuthenticationUser,updateProfile);

//routing to getting user details by admin
router.route("/admin/users").get(isAuthenticationUser,authorizeRoles("admin"),getAllUser);
//routing to getting single user details by admin
router.route("/admin/user/:id").get(isAuthenticationUser,authorizeRoles("admin"),getSingleUser)
.put(isAuthenticationUser,authorizeRoles("admin"),updateuserRole).delete(isAuthenticationUser,authorizeRoles("admin"),deleteUsers);

module.exports=router;



