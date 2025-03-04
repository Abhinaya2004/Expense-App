// const mongoose = require('mongoose')
const{Schema,model}=require('mongoose')
const catSchema=new Schema({
    name:{
        type:String,
        required:true
    }
},{timestamps:true})


const Category=model('categories',catSchema)

module.exports=Category