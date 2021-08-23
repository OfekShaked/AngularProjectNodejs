const router = require('express').Router();
const errorHandler = require('../services/error_handler');
//add message
router.post("/errors/add",async(req,res)=>{
    try{
        errorHandler({reactError:req.body.error});
        res.status(200).json("Success");
    }catch(err){
        res.status(400).json("Error");
        errorHandler(err)
    }
})

module.exports= router;