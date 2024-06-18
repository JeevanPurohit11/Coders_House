const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema gives blueprint of how our data store in our database;(created schema)
const userSchema= new Schema({
    phone : {type : String , required : true},
    name : {type : String , required : false},    // while writing name still activated was false only.
    avatar :{ type : String ,required :false},
    activated : { type : Boolean , required : false , default : false},
},
  {
    timestamps: true,
  }
);
                           //model Name , used Schema , table/connection name
module.exports = mongoose.model('User',userSchema,'users');