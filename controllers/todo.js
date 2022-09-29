const Todo=require("../models/todo")
const {errorHandler}=require("../utils/errors")

exports.getAllTodoList = async(req,res,next) => {
    try{
        const allTodo=await Todo.find({})
        return res.status(201).json(allTodo)
    }catch(err){
        return next(err)
    }
}

exports.getMyTodoList = async(req,res,next) => {
    const userId=req.user.id
    try{
        const allTodo=await Todo.find({
            user: userId
        }).sort({updatedAt: -1})
        return res.status(201).json(allTodo)
    }catch(err){
        return next(err)
    }
}

exports.createTodoList = async(req,res,next) => {
    try{
        const newTodo=new Todo({
            title: req.body.title,
            user: req.user.id,
            completedOrNot: req.body.completedOrNot,
            description: req.body.description,
        })
        const savedTodo=await newTodo.save()
        return res.status(201).json(savedTodo)
    }catch(err){
        return next(err)
    }
}

exports.updateTodo = async(req,res,next) => {
    try{
        const todo=await Todo.findById(req.params.todoId).exec()
        if(!todo)
            return next(errorHandler({
                status: 404,
                message: "No task Found"
            }))
        if(todo.user.toString() !== req.user.id)
            return next(errorHandler({
                status: 401,
                message: "Mind your own task"
            }))

        const updatedTodo=await Todo.findByIdAndUpdate(req.params.todoId, {
            title: req.body.title,
            description: req.body.description,
            completed: req.body.completed,
        }, {new: true})
        return res.status(200).json(updatedTodo)
    }catch(err){
        return next(err)
    }
}

exports.deleteTodo = async(req,res,next) => {
    try{
        const todo=await Todo.findById(req.params.todoId).exec()
        if(!todo)
            return next(errorHandler({
                status: 404,
                message: "No task Found"
            }))
        if(todo.user.toString() !== req.user.id)
            return next(errorHandler({
                status: 401,
                message: "Mind your own task"
            }))
        await Todo.findByIdAndDelete(req.params.todoId)
        return res.status(200).json("Task deleted successfully")
    }catch(err){
        return next(err)
    }
}