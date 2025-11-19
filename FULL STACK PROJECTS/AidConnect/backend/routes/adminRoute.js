const express = require("express");

const upload = require("../middlewares/multer");
const { addDoctor } = require("../controllers/adminController");
const { adminLogin } = require("../controllers/adminController");
const authAdmin = require("../middlewares/authAdmin");

const adminRouter = express.Router();

adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
adminRouter.post("/admin-login", adminLogin);
module.exports = adminRouter;
