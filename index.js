const express = require("express")
const cors = require("cors")
require('dotenv').config({ path: '.env.development.local' })
const app = express()
const port = 3300
const host = "0.0.0.0" //ensures it listens on all network interfaces
const base_url = process.env.END_POINT

app.use(cors({
    origin: base_url,
    credentials: true
  }))

app.use(express.json())
app.use((req, res, next) => {
    console.log('Headers:', req.headers);
    console.log('Cookies:', req.cookies);
    next();
  });
  

app.use((req,res,next)=>{
    console.log("middleware "+ req.url + ` /${base_url}/ ` + JSON.stringify(req.body))
    next()
})

const {GetUsers} = require("./auth/GetUsers")

app.get('/',GetUsers)

const {AddUser} = require("./auth/AddUser")
app.post('/addUser',AddUser)

app.listen(port,host,()=>{
    console.log(`listening to http://${host}:${port}`)
})
