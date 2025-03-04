// const mongoose = require('mongoose')
const{Schema,model}=require('mongoose')
const expenseSchema = new Schema({
    expenseDate:{
        type:Date,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    category:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"Category"
    },
    description:{
        type:String
    }
})

const Expense=model('Expense',expenseSchema)

module.exports=Expense