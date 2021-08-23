const express=require('express');
const router = express.Router();
const imageService = require("../services/image_sevice")


router.post('/images/add',async(req,res)=>{
    try{
    await imageService.addNewImage(req.body)
    res.send({isSuccess:"Success",status:200});
}catch(err){
        console.log(err);
        res.send({isSuccess:"Error",status:400});
    }
});
router.get("/images",async(req,res)=>{
    try{
    res.send({status:200,images:await imageService.getAllImages()});
    }catch(err){
        console.log(err);
        res.send({isSuccess:"Error",status:400});
    }
});
router.post("/images/udpate",async(req,res)=>{
    try{
        await imageService.editImageData(req.body);
        res.send({isSuccess:"Success",status:200});
    }catch(err){
        console.log(err);
        res.send({isSuccess:"Error",status:400});
    }
})

module.exports=router;