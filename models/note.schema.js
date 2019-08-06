var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var noteSchema=new Schema({
    username:String,
  password:String,
  notes:[{
   
    data:String,
    datentime:Date
  }]
})
var Notes=mongoose.model("Notes",noteSchema);
module.exports=Notes;