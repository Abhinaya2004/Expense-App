const Category = require("../models/category-model")

const categoryValidationSchema = {
    name:{
        in:['body'],
        exists:{
            errorMessage:'name field is required'
        },
        notEmpty:{
            errorMessage:'cannot be empty string'
        },
        isLength:{
            options:{min:3,max:10},
            errorMessage:'length is not matching constraints'
        },
        trim:true,
        custom:{
            options:async function(value){
                const category = await Category.findOne({name:value})
                if(category){
                    throw new Error('name already exists')
                }else{
                    return true
                }
            } 
        }
    }
}

module.exports = categoryValidationSchema