const Category = require('../models/category-model')
const {validationResult} = require('express-validator')
const categoryCltr ={}

categoryCltr.list = async (req,res)=>{

    try{
        const categories = await Category.find()
        res.json(categories)
    }catch(e){
        console.log(e)
        res.status(500).json({error:'something went wrong'})
    }
    
    // Category.find()
    //     .then((categories)=>{
    //         res.json(categories)
    //     })
    //     .catch((err)=>{
    //         res.status(500).json({errot:'something went wrong',err})
    //     })
}

categoryCltr.show = async (req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const id=req.params.id

    try{
        const category = await Category.findById(id)
        if(!category){
            res.status(404).json({error:'not found'})
        }else{
            res.json(category)
         }
        
    }catch(e){
        console.log(e)
        res.status(500).json({error:"something went wrong"})
    }

    // Category.findById(id)
    //     .then((c)=>{
    //         if(!c){
    //             res.status(404).json({error:'not found'})
    //         }else{
    //             res.json(c)
    //         }
    //     })
    //     .catch((e)=>{
    //         console.log(e)
    //         res.status(500).json({error:"something went wrong"})

    //     })
}

categoryCltr.create = async (req,res)=>{
    const error=validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({errors:error.array()})
    }

    let body=req.body
    // const catObj=new Category(body)
    // catObj.save()
    try{
        const category = await Category.create(body)
        res.status(201).json(category)
    } catch (e){
        console.log(e)
        res.status(500).json({error:"something went wrong"})
    }
    // Category.create(body)
    // .then((cat)=>{
    //         res.status(201).json(cat)
    //     })
    //     .catch((e)=>{
    //         res.status(500).json(e)
    //     })
}

categoryCltr.update = async (req,res)=>{
    const error=validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({errors:error.array()})
    }
    const id=req.params.id
    const body=req.body
    try{
        const category = await Category.findByIdAndUpdate(id,body,({new:true,runvalidators:true}))
        if(!category){
            res.status(404).json({error:"record not found"})
        }else{
            res.json(category)
        }
    } catch (e){
        console.log(e)
            res.status(500).json({error:"something went wrong"})
    }
    // Category.findByIdAndUpdate(id,body,({new:true,runvalidators:true}))
    //     .then((c)=>{
    //         if(!c){
    //             res.status(404).json({error:"record not found"})
    //         }else{
    //             res.json(c)
    //         }
    //     })
    //     .catch((e)=>{
    //         console.log(e)
    //         res.status(500).json({error:"something went wrong"})
    //     })
}

categoryCltr.remove = async (req,res)=>{
    const error=validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({errors:error.array()})
    }
    const id= req.params.id
    try{
        const category = await Category.findByIdAndDelete(id)
        if(!category){
            res.status(404).json({error:"record not found"})
        }else{
            res.json(category)
        }
    } catch (e){
        console.log(e)
            res.status(500).json({error:"something went wrong"})
    }
    // Category.findByIdAndDelete(id)
    //     .then((category)=>{
    //         if(!category){
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

module.exports = categoryCltr