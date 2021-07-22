const express=require('express');
const router = express.Router();
const imageService = require("../services/image_sevice")


router.post('/images/add',async(req,res)=>{
    try{
    await imageService.addNewImage(req.body)
    res.status(200);
    }catch(err){
        console.log(err);
        res.status(400);
    }
});
router.get("/images",async(req,res)=>{
    try{
    res.status(200).send(await imageService.getAllImages());
    }catch(err){
        console.log(err);
        res.status(400);
    }
});
router.post("/images/udpate",async(req,res)=>{
    try{
        await imageService.updateImageData(req.body);
        res.status(200);
    }catch(err){
        console.log(err);
        res.status(400);
    }
})

module.exports=router;