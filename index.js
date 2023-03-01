const express = require("express")
const app = express()

const db = require("./models")
const { User } = require('./models')
app.get('/select',(req,res) => {
    res.send("select")
})

app.get('/insert',(req,res) => {

    User.create({
        firstName: "divine",
        email: "divinemaina@gmail.com"
    }).catch(err =>{
        if (err){
            console.log(err)
        }
    })
    res.send("insert")
})

db.sequelize.sync().then((res)=>{

    app.listen(3000, ()=>{
        console.log("server started")
    })
})