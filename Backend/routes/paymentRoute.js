const express = require("express");

const {processPayment, sendStripeApiKey} = require("../controllers/paymentController");

const router = express.Router();
const {isAuthenticationUser} = require("../middleware/authen");

router.route("/payment/process").post(isAuthenticationUser, processPayment);
router.route("/stripeapikey").get(isAuthenticationUser, sendStripeApiKey);

module.exports= router;