const express = require("express")
const cors = require("cors")

const app = express()
const port = 3300
const host = "0.0.0.0" //ensures it listens on all network interfaces
app.use(cors())
app.use(express.json())

const {GetUsers} = require("./auth/GetUsers")

app.get('/',GetUsers)

const {AddUser} = require("./auth/AddUser")
app.post('/addUser',AddUser)

app.listen(port,host,()=>{
    console.log(`listening to http://${host}:${port}`)
})
