const express = require("express");
const router = express.Router();
const { isAunthenticatedUser } = require("../middleware/auth");
const { processPayment, sendStripeApiKey } = require("../controller/paymentController");

router.route("/payment/process").post(isAunthenticatedUser, processPayment);

router.route("/stripeapikey").get(isAunthenticatedUser, sendStripeApiKey)

module.exports = router;
