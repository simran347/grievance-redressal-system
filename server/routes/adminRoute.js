const express = require('express')
const routes = express.Router();
const Admin = require('../models/Admin') 
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const College = require('../models/College')
const Complaint = require('../models/Complaint')

//admin register code
routes.post('/register',async (req,res)=>{
    try{
        const {name, email, password} = req.body;
        //check admin exist or not
        const isExist = await Admin.countDocuments();
        if(isExist>0){
            return res.json({"msg":"Admin already register"})
        }
        //check
        const user = await Admin.findOne({email:email})
        if(user){
            return res.json({"msg":"Email already Register"})
        }
        const a = new Admin({ name, email, password });
        await a.save();
        return res.status(201).json({ "msg": "Admin Registered Successfully" });
    } catch(er) {
        console.log(er);
        console.log({"msg":"Admin Not Register Successfully"})
    }
})

routes.post('/login', async(req,res)=>{
    try{
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ "msg": "Email and password are required" });
        }

        const user = await Admin.findOne({ email: email });
        if(!user){
            return res.json({"msg":"Email Not Found"})
        }

        if (user.password === password) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || process.env.JWT_SECERT, { expiresIn: '1d' })
            res.json({
                "msg":"success",
                "adminId": user._id,
                "name": user.name,
                "token": token
            })
        }else{
            return res.json({"msg":"password is incorrect"})
        }
    }catch(er){
        console.log(er);
        res.json({"msg":"Server error"})
    }
})

routes.get('/stats', async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const notProcessed = await Complaint.countDocuments({ status: 'not-processed' });
        const pending = await Complaint.countDocuments({ status: 'pending' });
        const closed = await Complaint.countDocuments({ status: 'closed' });
        const totalColleges = await College.countDocuments({ status: 'active' });
        const blockedUsers = 0; // Currently placeholder until user blocking logic is set

        return res.json({
            totalUsers,
            notProcessed,
            pending,
            closed,
            totalColleges,
            blockedUsers
        });
    } catch (er) {
        console.error(er);
        res.status(500).json({ "msg": "Server error" });
    }
});

module.exports = routes;
