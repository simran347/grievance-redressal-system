const express = require('express');
const routes = express.Router();
const College = require('../models/College');

// register api
routes.post('/register', async (req, res) => {
    try {
        const {name,description}= req.body
        if(!name || !description){
            return res.json({"msg":"All fields are mandatory"})
        }

        // const { name } = req.body;

        const c = await College.findOne({ name: name });
        if (c) {
            return res.json({ "msg": "College Already Exist" });
        }

        const clg = new College({
            name,
            description,
            status: 'active'
        });

        await clg.save();
        return res.json({ "msg": "College registered" });

    } catch (er) {
        console.error(er);
        return res.json({ "msg": "Server error" });
    }
});

// all college data view api
routes.get('/show',async(req,res)=>{
    try{
        const a = await College.find({status:{$in:["active","inactive"]}});
        return res.json({"msg":"Data fetched","College":a, "colleges": a, "college": a})
    }catch(er){
        console.error(er);
        return res.json({"msg":"server error"})
    }
})

//college update api
routes.put("/:id", async (req,res)=>{
    try{
        const {id} = req.params;
        const { name, description } = req.body
        await College.findByIdAndUpdate(id,{ name:name, description:description})
        return res.json({"msg":"College Updated successfully"})

        }catch (er){
       console.error(er)
       return req.json({"msg":"Server error"})
    }
})

//college delete api
routes.delete('/:id',async(req,res)=>{
    try{
        const {id} = req.params
const data = await College.findByIdAndUpdate(id,{status:"delete"})
return res.json({"msg":"college Deleted "})

    }catch(er){
        console.error(er)
     return res.json({"msg":"server error"})
    }
})

//api for register page of active colleges
routes.get('/active',async(req,res)=>{
    try{
        const data = await College.find({status:'active'})
        return res.json ({"msg":"college fetched","college":data})
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
        await College.findByIdAndUpdate(id,{status:status})
        return res.json ({"msg":"status updated"})

    }catch(er){
        console.error(er)
        return res.json({"msg":"Server error"})
    }
})


module.exports = routes;