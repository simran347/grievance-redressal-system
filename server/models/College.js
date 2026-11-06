const mongoose = require('mongoose')

const collegeSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:['active','inactive','delete']
    }
},{
    timestamps:true

})
module.exports = mongoose.model("College",collegeSchema)