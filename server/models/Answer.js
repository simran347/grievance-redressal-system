const mongoose = require('mongoose')

const answerSchema = mongoose.Schema({
    questionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Question",
        required:true,

    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true

    },
    answer:{
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

module.exports = mongoose.model("Answer",answerSchema)
