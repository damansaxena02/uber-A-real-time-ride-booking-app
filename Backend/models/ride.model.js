
require("./user.model"); 

const moongoose = require('mongoose');
const rideSchema = new moongoose.Schema({
  user:{
    type: moongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  captain:{
    type: moongoose.Schema.Types.ObjectId,
    ref: 'Captain'
  },
  pickup:{
    type:String,
    required:true,
  },
  destination:{
    type:String,
    required:true,
  },
  fare:{
    type:Number,
    required:true,
  },
  status:{
    type:String,
    enum:['pending','accepted','ongoing','completed','cancle'],
    default:'pending',
  },
  durastion:{
    type:Number,

  },
  distance:{
    type:Number
  },
paymentID:{
    type:String
},
orederID:{
    type:String
},
signature:{
    type:String
},
otp:{
    type:String,
    select:false,
    required:true,
}


})
module.exports=moongoose.model('ride',rideSchema)