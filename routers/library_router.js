const express=require('express');
const libraryService = require('../services/library_service');
const router = express.Router();

router.post("/library/add",async(req,res)=>{
    try{
        await libraryService.addLibaryDetails(req.body);
        res.send({isSuccess:"Success",status:200});
    }catch(err){
        res.send({isSuccess:"Error",status:400});
    }
})
module.exports=router;
