const express = require('express');
const routes = express.Router();
const Complaint = require('../models/ComplaintType');

// register api
routes.post('/register', async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name || !description) {
            return res.status(400).json({ "msg": "Name and description are required" });
        }

        const c = await Complaint.findOne({ name: name });
        if (c) {
            return res.status(409).json({ "msg": "Complaint type already exists" });
        }

        const clg = new Complaint({
            name,
            description,
            status: 'active'
        });

        await clg.save();
        return res.status(201).json({ "msg": "Complaint type registered" });

    } catch (er) {
        console.error(er);
        return res.status(500).json({ "msg": "Server error" });
    }
});

// all Complaint data view api
routes.get('/show',async(req,res)=>{
    try{
        const a = await Complaint.find({status:{$in:["active","inactive"]}});
        return res.json({"msg":"Data fetched","Complaint":a, "complaints": a, "complaint": a})
    }catch(er){
        console.error(er);
        return res.status(500).json({"msg":"server error"})
    }
})

//Complaint update api
routes.put("/:id", async (req,res)=>{
    try{
        const {id} = req.params;
        const { name, description } = req.body
        await Complaint.findByIdAndUpdate(id,{ name:name, description:description})
        return res.json({"msg":"Complaint Updated successfully"})

        }catch (er){
       console.error(er)
       return res.json({"msg":"Server error"})
    }
})

//Complaint delete api
routes.delete('/:id',async(req,res)=>{
    try{
        const {id} = req.params
const data = await Complaint.findByIdAndUpdate(id,{status:"delete"})
return res.json({"msg":"Complaint Deleted "})

    }catch(er){
        console.error(er)
     return res.json({"msg":"server error"})
    }
})

//api for register page of active Complaints
routes.get('/active',async(req,res)=>{
    try{
        const data = await Complaint.find({status:'active'})
        return res.json ({"msg":"Complaint fetched","Complaint":data})
   }catch(er){
    console.error(er)
    return res.json({"msg":"server error"})
   }
})


//block / unblock status api
routes.patch("/:id",async(req,res)=>{
    try{
        const {id} = req.params
        const {status} = req.body
        await Complaint.findByIdAndUpdate(id,{status:status})
        return res.json ({"msg":"status updated"})

    }catch(er){
        console.error(er)
        return res.json({"msg":"Server error"})
    }
})


module.exports = routes;