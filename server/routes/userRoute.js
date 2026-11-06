const express = require('express')
const route = express.Router();
const User = require('../models/User');

route.post('/register', async (req, res) => {
    try {
        console.log('User register body:', req.body);
        const {
            name,
            father,
            email,
            mobile,
            gender,
            dob,
            password,
            sessionId,
            collegeId,
            course,
            enrollment,
            address
        } = req.body;

        if (!name || !father || !email || !mobile || !gender || !dob || !password || !sessionId || !collegeId || !course || !enrollment || !address) {
            return res.status(400).json({ msg: 'All fields are required' });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(409).json({ msg: 'Email already registered' });
        }

        const existingEnrollment = await User.findOne({ enrollment });
        if (existingEnrollment) {
            return res.status(409).json({ msg: 'Enrollment already registered' });
        }

        const newUser = new User({
            name,
            father,
            email,
            mobile,
            gender,
            dob,
            password,
            sessionId,
            collegeId,
            course,
            enrollment,
            address,
            status: 'active'
        });

        await newUser.save();
         res.status(201).json({ msg: 'Registered successfully' })
         const msg = `Dear ${name} you are registered successfully on grievance redressal portal of LNMUTh`;
        setTimeout(() =>{
         sendEmail(email,'Registration at Grievance Readressal dystem LMNU',msg)

        },100)
    } catch (er) {
        console.error('User registration error:', er);
        return res.status(500).json({ msg: 'server error', error: er.message });
    }
});

route.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        if (user.password !== password) {
            return res.status(401).json({ msg: 'Invalid email or password' });
        }

        return res.json({
            msg: 'Login successful',
            userId: user._id,
            name: user.name,
            email: user.email
        });
    } catch (er) {
        console.error('User login error:', er);
        return res.status(500).json({ msg: 'server error' });
    }
});

route.put('/change-password', async (req, res) => {
    try {
        const { userId, oldPassword, newPassword } = req.body;

        if (!userId || !oldPassword || !newPassword) {
            return res.status(400).json({ msg: 'User ID, old password, and new password are required' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        if (user.password !== oldPassword) {
            return res.status(401).json({ msg: 'Old password is incorrect' });
        }

        user.password = newPassword;
        await user.save();

        return res.json({ msg: 'Password updated successfully' });
    } catch (er) {
        console.error('Change password error:', er);
        return res.status(500).json({ msg: 'server error', error: er.message });
    }
});

// admin api for students view
route.get('/', async (req, res) => {
    try {
        const data = await User.find({ status: { $in: ['active', 'inactive'] } }).populate('sessionId','name').populate('collegeId','name')
        return res.json({ msg: 'user fetched', user: data });
    } catch (er) {
        console.log(er);
        return res.status(500).json({ msg: 'server error' });
    }
});


//view profile for particular students
route.get('/profile/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const data = await User.findById(id);
        return res.json({"msg":"User Fetched",user:data});
    }catch(er){
        console.log(er);
        return res.json({"msg":"Server error"})
    }
})

route.put('/profile/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            father,
            gender,
            dob,
            email,
            mobile,
            address,
            course,
            profile,
            city,
            pincode
        } = req.body;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        if (name) user.name = name;
        if (father) user.father = father;
        if (gender) user.gender = gender;
        if (dob) user.dob = dob;
        if (email) user.email = email;
        if (mobile) user.mobile = mobile;
        if (address) user.address = address;
        if (course) user.course = course;
        if (profile) user.profile = profile;
        if (city) user.city = city;
        if (pincode) user.pincode = pincode;

        await user.save();
        return res.json({ msg: 'Profile updated successfully' });
    } catch (er) {
        console.error('Profile update error:', er);
        return res.status(500).json({ msg: 'server error', error: er.message });
    }
});


module.exports = route