const express=require('express');
const router = express.Router();
const imageService = require("../services/image_sevice")


router.post('/images/add',async(req,res)=>{
    try{
    await imageService.addNewImage(req.body)
    res.status(200).send("Image added succesfully");
    }catch(err){
        console.log(err);
        res.status(400).send("Cannot add image");
    }
});
router.get("/images",async(req,res)=>{
    try{
    res.status(200).send(await imageService.getAllImages());
    }catch(err){
        console.log(err);
        res.status(400).send("Cannot get all images");
    }
});
router.post("/images/udpate",async(req,res)=>{
    try{
        await imageService.updateImageData(req.body);
        res.status(200).send("Updated image succesfully");
    }catch(err){
        console.log(err);
        res.status(400).send("Cannot update image data");
    }
})

module.exports=router;