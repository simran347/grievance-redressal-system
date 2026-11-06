const mongoose = require('mongoose')

const questionSchema = mongoose.Schema({
    
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true

    },
    question:{
        type:String,
        required:true,

    },
    status:{
         type: String,
        required: true,
         enum: ["active", "Inactive", "delete"],
         default: "active",

    }
},{
    timestamps:true
})

module.exports = mongoose.model("Question",questionSchema)
