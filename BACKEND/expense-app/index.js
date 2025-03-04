const express= require("express")
const mongoose=require("mongoose")
const {checkSchema,validationResult}=require('express-validator')
const app=express()
const port=3500

mongoose.connect('mongodb://127.0.0.1:27017/expense-app-july24')
    .then(()=>{
        console.log("connected to db")
    })
    .catch((err)=>{
        console.log("There was a error",err)
    })

app.use(express.json())


const{Schema,model}=mongoose
const catSchema=new Schema({
    name:{
        type:String,
        required:true
    }
},{timestamps:true})


const Category=model('categories',catSchema)

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
        trim:true
    }
}


const idValidationSchema = {
    id:{
        in:['params'],
        isMongoId:{
            error:'not a valid id'
        }
    }
}
app.post('/create-category',checkSchema(categoryValidationSchema),(req,res)=>{
    const error=validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({errors:error.array()})
    }

    let body=req.body
    // const catObj=new Category(body)
    // catObj.save()
    Category.create(body)
    .then((cat)=>{
            res.status(201).json(cat)
        })
        .catch((e)=>{
            res.status(500).json(e)
        })
})

app.get('/list-categories',(req,res)=>{
    Category.find()
        .then((categories)=>{
            res.json(categories)
        })
        .catch((err)=>{
            res.status(500).json({errot:'something went wrong',err})
        })
})

app.delete('/remove-category/:id',checkSchema(idValidationSchema),(req,res)=>{
    const error=validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({errors:error.array()})
    }
    const id= req.params.id
    Category.findByIdAndDelete(id)
        .then((category)=>{
            if(!category){
                res.status(404).json({error:'data not found'})
            }else{
                res.json(category)
            }
        })
        .catch((e)=>{
            console.log(e)
            res.status(500).json({error:"something went wrong"})
        })
})

app.put('/update-category/:id',checkSchema(categoryValidationSchema),checkSchema(idValidationSchema),(req,res)=>{
    const error=validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({errors:error.array()})
    }
    const id=req.params.id
    const body=req.body
    Category.findByIdAndUpdate(id,body,({new:true,runvalidators:true}))
        .then((c)=>{
            if(!c){
                res.status(404).json({error:"record not found"})
            }else{
                res.json(c)
            }
        })
        .catch((e)=>{
            console.log(e)
            res.status(500).json({error:"something went wrong"})
        })
})


app.get('/category/:id',checkSchema(idValidationSchema),(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const id=req.params.id
    Category.findById(id)
        .then((c)=>{
            if(!c){
                res.status(404).json({error:'not found'})
            }else{
                res.json(c)
            }
        })
        .catch((e)=>{
            console.log(e)
            res.status(500).json({error:"something went wrong"})

        })
})



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


const expenseValidationSchema = {
    expenseDate: {
        in: ['body'],
        exists: {
            errorMessage: 'expense date is required'
        },
        notEmpty: {
            errorMessage: 'date cannot be empty'
        },
        isDate: {
            options: {format: "yyyy-mm-dd"},
            errorMessage: 'date should be in yyyy-mm-dd'
        },
        trim: true
    },
    title: {
        in: ['body'],
        exists: {
            errorMessage: 'title field is required'
        },
        notEmpty: {
            errorMessage: 'title cannot be empty'
        },
        isLength: {
            options: {min:3},
            errorMessage: 'title should be atleast 3 characters'
        },
        trim: true
    },
    amount: {
        in: ['body'],
        exists: {
            errorMessage: 'amount field is required'
        },
        notEmpty: {
            errorMessage: 'amount cannot be empty'
        },
        isFloat: {
            options: {min:1},
            errorMessage: 'amount should be a number with atleast 1 '
        },
    },
    category :{
        in: ['body'],
        exists: {
            errorMessage: 'category field is required'
        },
        isMongoId: {
            errorMessage: 'category id is invalid'
        }
    },
    description:{
        in: ['body'],
        optional: true,
        exists: {
            errorMessage: 'description field is required'
        },
        isLength: {
            options: {min:5},
            errorMessage: 'description should be atleast 5 characters'
        },
        trim: true
    }


}

app.post('/expense',checkSchema(expenseValidationSchema),(req,res)=>{
    const errors = validationResult(req)
    if(! errors.isEmpty()){
        return res.json(400).json({errors: errors.array()})
    }

    const {body}=req
    Expense.create(body)
        .then((expense)=>{
            res.status(201).json(expense)
        })
        .catch((e)=>{
            console.log(e)
            res.status(500).json({error:"something went wrong"})
        })
})


app.get('/expense',(req,res)=>{
    Expense.find()
        .then((expense)=>{
            res.json(expense)
        })
        .catch((e)=>{
            console.log(e)
            res.status(500).json({error:"something went wrong"})
        })
})


app.get('/expense/:id',checkSchema(idValidationSchema),(req,res)=>{
    const errors = validationResult(req)
    if(! errors.isEmpty()){
        return res.json(400).json({errors: errors.array()})
    }

    const id=req.params.id
    Expense.findById(id)
        .then((expense)=>{
            if(!expense){
                res.status(404).json({error:'data not found'})
            }else{
                res.json(category)
            }
        })
        .catch((e)=>{
            console.log(e)
            res.status(500).json({error:"something went wrong"})
        })

})

app.get('/expense/category/:id',checkSchema(idValidationSchema),(req,res)=>{
    const errors = validationResult(req)
    if(! errors.isEmpty()){
        return res.json(400).json({errors: errors.array()})
    }

    const id=req.params.id
    Expense.find({category:id})
        .then((expense)=>{
            if(!expense){
                res.status(404).json({error:'data not found'})
            }else{
                res.json(category)
            }
        })
        .catch((e)=>{
            console.log(e)
            res.status(500).json({error:"something went wrong"})
        })

})

app.delete('/expense/:id',checkSchema(idValidationSchema),(req,res)=>{
    const errors = validationResult(req)
    if(! errors.isEmpty()){
        return res.json(400).json({errors: errors.array()})
    }

    const id=req.params.id
    Expense.findByIdAndDelete(id)
        .then((expense)=>{
            if(!expense){
                res.status(404).json({error:'data not found'})
            }else{
                res.json(category)
            }
        })
        .catch((e)=>{
            console.log(e)
            res.status(500).json({error:"something went wrong"})
        })

})

app.put('/expense/:id',checkSchema(expenseValidationSchema),checkSchema(idValidationSchema),(req,res)=>{
    const errors = validationResult(req)
    if(! errors.isEmpty()){
        return res.json(400).json({errors: errors.array()})
    }
    
    const id=req.params.id
    const body=req.body
    Expense.findByIdAndUpdate(id,body)
        .then((expense)=>{
            if(!expense){
                res.status(404).json({error:'data not found'})
            }else{
                res.json(category)
            }
        })
        .catch((e)=>{
            console.log(e)
            res.status(500).json({error:"something went wrong"})
        })

})


app.listen(port,()=>{
    console.log("server is running on port",port)
})