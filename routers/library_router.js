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

router.post("/library/setpassword",async(req,res)=>{
    try{
        await libraryService.setLibraryPassword(req.body.password);
        res.send({status:200,message:"Success"});
    }catch(err){
        console.log(err);
        res.send({isSuccess:"Error",status:400})
    }
})

router.get("/library",async (req,res)=>{
    try{
        let data = await libraryService.getLibraryData();
        res.send({status:200,data: data});
    }catch(err){
        console.log(err);
        res.send({isSuccess:"Error",status:400})
    }
})

router.get("/library/privatemode",async(req,res)=>{
    try{
        let isEnabled = await libraryService.checkIfLibraryHasPrivateMode();
        res.send({status:200,isEnabled: isEnabled});
    }catch(err){
        console.log(err);
        res.send({isSuccess:"Error",status:400})
    }
});

router.post("/library/checkpassword",async(req,res)=>{
    try{    
        let isCorrect = await libraryService.checkIfPasswordIsCorrect(req.body.password);
        res.send({status:200,isCorrect:isCorrect});
    }catch(err){
        console.log(err);
        res.send({isSuccess:"Error",status:400})
    }
})
module.exports=router;
