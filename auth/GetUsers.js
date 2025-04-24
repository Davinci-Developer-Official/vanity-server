const path = require("path")
const fs = require("fs")

const filePath = path.join(__dirname,'data.json')

// controllers/users.js
function GetUsers(req, res) {
    try {
        const data = fs.readFileSync(filePath,"utf-8")
    const filtered = JSON.parse(data)
    console.log(filtered.info)
    res.status(200).send(filtered.info);
    } catch (error) {
        res.status(500).send(error) 
        console.log(error)
    }
}

module.exports = { GetUsers };
