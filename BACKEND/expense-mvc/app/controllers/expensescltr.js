const Expense = require('../models/expense-model')
const {validationResult} = require('express-validator')
const expenseCltr = {}

expenseCltr.list =async (req,res)=>{
    try{
        const expenses = await Expense.find()
        res.json(expenses)
    } catch(e){
        console.log(e)
        res.status(500).json({error:'something went wrong'})
    }
    
    // Expense.find()
    //     .then((expense)=>{
    //         res.json(expense)
    //     })
    //     .catch((e)=>{
    //         console.log(e)
    //         res.status(500).json({error:"something went wrong"})
    //     })
}

expenseCltr.show = async (req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const id=req.params.id
    try{
        const expense = await Expense.findById(id)
        if(!expense){
            res.status(404).json({error:'not found'})
        }else{
            res.json(expense)
        }
        
    } catch(e){
        console.log(e)
        res.status(500).json({error:'something went wrong'})
    }
    // Expense.findById(id)
    //     .then((expense)=>{
    //         if(!expense){
    //             res.status(404).json({error:'not found'})
    //         }else{
    //             res.json(expense)
    //         }
    //     })
    //     .catch((e)=>{
    //         console.log(e)
    //         res.status(500).json({error:"something went wrong"})

    //     })
}

expenseCltr.create = async (req,res)=>{
    const errors = validationResult(req)
    if(! errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {body}=req
    try{
        const expenses = await Expense.create(body)
        res.json(expenses)
    } catch(e){
        console.log(e)
        res.status(500).json({error:'something went wrong'})
    }
    // Expense.create(body)
    //     .then((expense)=>{
    //         res.status(201).json(expense)
    //     })
    //     .catch((e)=>{
    //         console.log(e)
    //         res.status(500).json({error:"something went wrong"})
    //     })
}

expenseCltr.update = async (req,res)=>{
    const errors = validationResult(req)
    if(! errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    
    const id=req.params.id
    const body=req.body
    try{
        const expense = await Expense.findByIdAndUpdate(id,body)
        if(!expense){
            res.status(404).json({error:'not found'})
        }else{
            res.json(expense)
        }
        
    } catch(e){
        console.log(e)
        res.status(500).json({error:'something went wrong'})
    }
    // Expense.findByIdAndUpdate(id,body)
    //     .then((expense)=>{
    //         if(!expense){
    //             res.status(404).json({error:'data not found'})
    //         }else{
    //             res.json(category)
    //         }
    //     })
    //     .catch((e)=>{
    //         console.log(e)
    //         res.status(500).json({error:"something went wrong"})
    //     })

}

expenseCltr.remove =async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const id=req.params.id
    try{
        const expense = await Expense.findByIdAndDelete(id)
        if(!expense){
            res.status(404).json({error:'not found'})
        }else{
            res.json(expense)
        }
        
    } catch(e){
        console.log(e)
        res.status(500).json({error:'something went wrong'})
    }
    // Expense.findByIdAndDelete(id)
    //     .then((expense)=>{
    //         if(!expense){
    //             res.status(404).json({error:'data not found'})
    //         }else{
    //             res.json(category)
    //         }
    //     })
    //     .catch((e)=>{
    //         console.log(e)
    //         res.status(500).json({error:"something went wrong"})
    //     })

}

module.exports = expenseCltr