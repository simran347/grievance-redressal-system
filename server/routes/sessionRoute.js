const express = require('express');
const routes = express.Router();
const Session = require('../models/Session');

// register api
routes.post('/register', async (req, res) => {
    try {
        const { name} = req.body;

        const c = await Session.findOne({ name: name });
        if (c) {
            return res.json({ "msg": "Session Already Exist" });
        }

        const clg = new Session({
            name,
            status: 'active'
        });

        await clg.save();
        return res.json({ "msg": "Session registered" });

    } catch (er) {
        console.error(er);
        return res.json({ "msg": "Server error" });
    }
});

// all college data view api
routes.get('/show',async(req,res)=>{
    try{
        const a = await Session.find({status:{$in:["active","inactive"]}});
        return res.json({"msg":"Data fetched","Session":a})


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
        await Session.findByIdAndUpdate(id,{ name:name})
        return res.json({"msg":"Session Updated successfully"})

        }catch (er){
       console.error(er)
       return res.json({"msg":"Server error"})
    }
})

//session delete api
routes.delete('/:id',async(req,res)=>{
    try{
        const {id} = req.params
const data = await Session.findByIdAndUpdate(id,{status:"delete"})
return res.json({"msg":"session Deleted "})

    }catch(er){
        console.error(er)
     return res.json({"msg":"server error"})
    }
})

//api for register page of active session
routes.get('/active',async(req,res)=>{
    try{
        const data = await Session.find({status:'active'})
        return res.json ({"msg":"session fetched","session":data})
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
        await Session.findByIdAndUpdate(id,{status:status})
        return res.json ({"msg":"status updated"})

    }catch(er){
        console.error(er)
        return res.json({"msg":"Server error"})
    }
})



module.exports = routes;