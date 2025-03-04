const express= require("express")
const cors = require('cors')
const app=express()
const {checkSchema}=require('express-validator')
const port=3030
const configureDB = require('./config/db')
const categoryCltr = require('./app/controllers/categoriescltr')
const expenseCltr = require('./app/controllers/expensescltr')
const idValidationSchema = require("./app/validators/id-schema-validation")
const categoryValidationSchema = require("./app/validators/category-schema-validation")
const expenseValidationSchema = require("./app/validators/expense-schema-validation.js")
configureDB()


app.use(express.json())
app.use(cors())

app.get('/categories',categoryCltr.list)
app.get('/categories/:id',checkSchema(idValidationSchema),categoryCltr.show)
app.post('/categories',checkSchema(categoryValidationSchema),categoryCltr.create)
app.put('/categories/:id',checkSchema(categoryValidationSchema),checkSchema(idValidationSchema),categoryCltr.update)
app.delete('/categories/:id',checkSchema(idValidationSchema),categoryCltr.remove)

app.get('/expenses',expenseCltr.list)
app.get('/expenses/:id',checkSchema(idValidationSchema),expenseCltr.show)
app.post('/expenses',checkSchema(expenseValidationSchema),expenseCltr.create)
app.put('/expenses/:id',checkSchema(expenseValidationSchema),checkSchema(idValidationSchema),expenseCltr.update)
app.delete('/expenses/:id',checkSchema(idValidationSchema),expenseCltr.remove)


app.listen(port,()=>{
    console.log("server is running on port",port)
})