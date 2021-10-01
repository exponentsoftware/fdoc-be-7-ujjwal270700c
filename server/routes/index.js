const load = require("dotenv").config();
if (load.error) throw load.error;

const express = require("express");
const router = express.Router();


// MIDDLEWARE
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


// ROUTERS

router.use("/auth", require("./auth.route"));
router.use("/todo", require("./todo.route"));



module.exports = router;