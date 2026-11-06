const express = require('express')
const routes = express.Router();
const Qusetion = require('../models/Question')
const Answer = require('../models/Answer')
//for question register
routes.post('/question',async (req,res)=>{
    try{
        const {userId, question} = req.body
        if(!userId || !question){
            return res.json({"msg":"All fields are required"})
        }
        const a = await new Qusetion({
            userId:userId,
            question:question,
            status:'active'
        });
        a.save();
        return res.json({"msg":"Question Registered"})

    }catch(er){
            console.log(er);
            return res.json({"msg":"server error"})
    }
})

//fetch all question for admin api
routes.get('/show',async (req,res)=>{
    try{
        const data = await Qusetion.find({status:['active','inactive']}).populate('userId','name')
        return res.json({"msg":"data fetched",question:data})
    }catch(er){
        console.log(er)
        return res.json({"msg":"Server error"})
    }

})


//answer api for any question
routes.post('/answer',async (req,res)=>{
    try{
        const {questionId, userId, answer} = req.body
        if(!questionId || !userId || !answer){
            return res.json({"msg":"all fields are required"})
        }

        const data = await new Answer({
            questionId:questionId,
            userId:userId,
            answer:answer,
            status:'active'
        });
        await data.save();
        return res.json({"msg":"Answer added"})
    }catch(er){
        console.log(er);
        return res.json({"msg":"Server error"})
    }
})

// fetch all answer by question id
routes.get('/answer/:id', async (req,res)=>{
    try{
        const {id} = req.params;
        const data = await Answer.find({questionId:id, status:'active'}).populate('questionId','question').populate('userId','name')
        return res.json({"msg":"Data fetched","answer":data})

    }catch(er){
        console.log(er)
        return res.json({"msg":"server error"})
    }
})

module.exports = routes