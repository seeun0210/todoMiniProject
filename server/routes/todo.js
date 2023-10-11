const express = require("express");
const controller = require("../controller/todoController");
const router = express.Router();

router.get("/todos", controller.getTodos);
router.post("/todo", controller.postTodo);
router.patch("/todo/:id", controller.patchTodo);
router.delete("/todo/:id", controller.deleteTodo);

module.exports = router;
