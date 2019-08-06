const express=require('express');
const router=express.Router();
var Notes=require("../models/note.schema");
router.post("/signup",(req,res)=>{
var data=req.body;
Notes.find({
    username:data.username
},(error,docs)=>{
    if(error){
console.log(error);
    }else{
        if(docs.length==0){
            var note=new Notes({
                username:data.username,
                password:data.password,
            notes:[]
            })
            note.save().then(data=>{
            console.log('data',data);
                res.jsonp({
                success:true,
                message:"registratin is done successfully"
            })
            })

        }
        else{
res.jsonp({
    success:false,
    message:"This username is already exist. Please try another username"
})
        }
    }
})
})
router.post('/login',(req,res)=>{
var data=req.body;
Notes.findOne(
    {
        username:data.username,
        password:data.password
    },(error,docs)=>{
        if(error){
   console.log(error);
   res.jsonp({
    success:false,
    message:"something went wrong"
})
        }else{
            console.log(docs);
            if(docs){
                res.jsonp({
                    success:true,
                    _id:docs._id
                })
            }else{
                res.jsonp({
                    success:false,
                    message:"Invalid User"
                })
            }
        }
    })
})
module.exports=router;

