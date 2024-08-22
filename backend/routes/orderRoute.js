const express = require("express");
const router = express.Router();

const { isAunthenticatedUser, authorizeRoles } = require("../middleware/auth");
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require("../controller/orderController");
const { deleteProduct } = require("../controller/productController");

router.route("/order/new").post(isAunthenticatedUser, newOrder);

router.route("/order/:id").get(isAunthenticatedUser, getSingleOrder)

router.route("/orders/me").get(isAunthenticatedUser, myOrders)

router.route("/admin/orders").get(isAunthenticatedUser, authorizeRoles("admin"), getAllOrders);

router.route("/admin/order/:id").put(isAunthenticatedUser, authorizeRoles("admin"), updateOrder).delete(isAunthenticatedUser, authorizeRoles("admin"), deleteOrder)


module.exports = router;
