const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const port = 3019

const app = express(); 
app.use(express.static(__dirname));
app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb://127.0.0.1:27017/alumni')
const db = mongoose.connection
db.once('open',()=>{
    console.log('Mongo conn established')
})

const alumni_schema = new mongoose.Schema({
    alumniName:String,
    alumniEmail:String,
    alumniPassword:String,
    alumniBatch:String,
    alumniBranch:String,
    alumniJob:String,
    alumniContact:String
})

const Alumni = mongoose.model("data",alumni_schema)

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'alumni_register.html'))
})

app.post('/post', async(req,res)=> {
    const {alumniName, alumniEmail, alumniPassword,alumniBatch,alumniBranch,alumniJob,alumniContact} = req.body
    const alumniUser = new Alumni({
        alumniName,
        alumniEmail,
        alumniPassword,
        alumniBatch,
        alumniBranch,
        alumniJob,
        alumniContact
    })
    await alumniUser.save()
    console.log(alumniUser)
    res.send('Form Submitted')
})

app.listen(port, ()=>{
    console.log("Started") 
})