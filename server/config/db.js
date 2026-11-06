const mongoose = require ('mongoose')

const mongoDB = ()=>{
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("database connected")
    }).catch((er)=>{
        console.log(er)
        console.log("database not connected")
    })
}

module.exports = mongoDB;