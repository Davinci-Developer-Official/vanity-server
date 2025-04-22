const express = require("express")
const cors = require("cors")

const app = express()
const port = 3300
app.use(cors())

const {GetUsers} = require("./auth/GetUsers")

app.get('/',GetUsers)


app.listen(port,()=>{
    console.log(`listening to port ${port}`)
})
