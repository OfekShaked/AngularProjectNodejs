const express=require('express');
const categoryService = require('../services/category_service');
const router = express.Router();

router.get("/category/add/:category_name",async (req,res)=>{
    try{
    await categoryService.addCategory(req.params);
    res.status(200).send("Category added!");
    }catch(err){
        console.log(err);
        res.status(400).send("Could not add category");
    }
});

router.get("/categories",async (req,res)=>{
    try{
    res.status(200).send(await categoryService.getAllCategories());
    }catch(err){
        console.log(err);
        res.status(400).send("cannot get all categories")
    }
})

module.exports=router;