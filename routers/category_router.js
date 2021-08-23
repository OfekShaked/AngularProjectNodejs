const express=require('express');
const categoryService = require('../services/category_service');
const router = express.Router();

router.get("/category/add/:category_name",async (req,res)=>{
    try{
    await categoryService.addCategory(req.params);
    res.send({isSuccess:"Success",status:200});
}catch(err){
        console.log(err);
        res.send({isSuccess:"Error",status:400});
    }
});

router.get("/categories",async (req,res)=>{
    try{
    res.send({status:200,categories:await categoryService.getAllCategories()});
    }catch(err){
        console.log(err);
        res.send({isSuccess:"Error",status:400});
    }
})

module.exports=router;