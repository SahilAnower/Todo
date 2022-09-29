const express=require("express")
const { createTodoList,getAllTodoList,getMyTodoList,updateTodo,deleteTodo }=require("../controllers/todo")

const router=express.Router()


router.post("/",createTodoList)
router.get("/me",getMyTodoList)
router.get("/all",getAllTodoList)
router.put("/:todoId",updateTodo)
router.delete("/:todoId",deleteTodo)

module.exports=router 