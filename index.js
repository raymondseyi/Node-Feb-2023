const express = require("express");
const app = express();
const ejs = require("ejs")
const mongoose = require("mongoose")
app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}))

let URI = "mongodb+srv://seyidami13:mongodbpass@cluster0.jc3kz.mongodb.net/school_portal_db?retryWrites=true&w=majority"

//UNIFORM RESOURCE IDENTIFIER - URI
// UNIFORM RESOURCE LOCATOR - URL

// New Way
mongoose.connect(URI).then(()=>{
   console.log("mongodb connected")
}).catch((err)=>{
    console.log("mongodb no gree connect")
    console.log(err)
})

// CRUD - CREATE, READ, UPDATE, DELETE

// Create Data into Database
let studentSchema = mongoose.Schema({
    firstname : {type:String,required:true},
    lastname : {type:String,required:true},
    email : {type:String,unique:true,required:true},
    password: {type:String,required:true},
    creationDate : {type:Date,default:Date.now}
})

// Create A Model -  nameofdocument,schema
let studentModel = mongoose.model("students",studentSchema)

// Old way
// mongoose.connect(URI,(err)=>{
//     if(err){
//         console.log(err)
//     }else{
//         console.log("it has connected")
//     }
// })

// model.find()
// model.

app.get("/signup",(req,res)=>{
    res.render("signup")
})
app.get("/dashboard",(req,res)=>{
    studentModel.find()
    .then((response)=>{
        res.render("dashboard",{response})
        console.log(response)
    })
    .catch((err)=>{
        res.render("dashboard")
        console.log(err)
    })
})
app.post("/register",(req,res)=>{
    console.log(req.body)
    let form = new studentModel(req.body)
    form.save().then(()=>{
        console.log("saved successfully")
        res.redirect("/dashboard")
        // res.render("dashboard")
    }).catch((err)=>{
        console.log("itaf refused to save")
        console.log(err)

    })

})
app.post("/delete",(req,res)=>{
    console.log(req.body.id)
    studentModel.findByIdAndDelete(req.body.id)
    .then((response)=>{
        console.log("it has been deleted")
        res.redirect("/dashboard")
    })
    .catch((err)=>{
        console.log(err)
    })
})
app.post("/edit",(req,res)=>{
    console.log(req.body)
    let {firstname,lastname,email,password} = req.body
    studentModel.findByIdAndUpdate(req.body.id,{firstname,lastname,email,password})
    .then(()=>{
        console.log("updated successfully")
        res.redirect("/dashboard")
    })
    .catch((err)=>{
        console.log(err)
    })
})
app.listen(5000,()=>{
    console.log("app has started")
})
// install thunder client extension on vscode
// download and install insomnia and postman
// create an account with npmjs.com
// create an account with cloudinary.com