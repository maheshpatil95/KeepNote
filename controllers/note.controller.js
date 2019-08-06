var Notes=require("../models/note.schema");
const express=require('express');
const router=express.Router();

router.post("/create",(req,res)=>{
var reqdata=req.body;

var data=reqdata.note;
var datentime=new Date();

Notes.findOneAndUpdate(
    { _id:reqdata._id},
    {
         $push:{
        notes:{ 
        data,
        datentime
    }
}}).then((d)=>{
    console.log(d);
    if(d){
        res.jsonp({
            success:true,
            message:"note saved"
        })
    }else{
        res.jsonp({
            success:false,
            message:"something went wrong"
        })
    }


}).catch(error=>{
    console.log('Error',error);
    res.jsonp({
        success:false,
        message:"something went wrong"
    })
})
})

router.get('/getnote/:id',(req,res)=>{
var id=req.params.id;

Notes.findById(id,'notes',(error,doc)=>{
if(error){
    console.log('error',error);
res.jsonp({
    success:false,
    message:"Something went wrong"
})
}else{  
    res.jsonp({
        success:true,
        result:doc.notes
    })
}
})
})


router.post("/update",(req,res)=>{
    
Notes.findOneAndUpdate(
    {_id:req.body._id,"notes._id":req.body.note._id},
    { $set: { "notes.$.data":req.body.note.data,"notes.$.datentime":new Date()}
 }).then(data=>{
    res.status(200).jsonp({
        success: true,
        data: data,
        message:"Updated"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).jsonp({
        success: false,
        error: err.message
      });
    });
})
 

router.post("/delete",(req,res)=>{

Notes.findByIdAndUpdate(req.body._id,
    {
        $pull: { notes: { _id:`${req.body.note._id}` } }
    }).then(data => {
        console.log(data);
        res.status(200).jsonp({
          success: true
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).jsonp({
          success: false,
          error: err.message
        });
      });
  


})

module.exports=router