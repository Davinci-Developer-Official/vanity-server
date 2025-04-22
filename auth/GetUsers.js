const path = require("path")
const fs = require("fs")

const filePath = path.join(__dirname,'data.json')

// controllers/users.js
function GetUsers(req, res) {
    const data = fs.readFileSync(filePath,"utf-8")
    const filtered = JSON.parse(data)
    console.log(filtered.info)
    res.send(filtered.info);
}

module.exports = { GetUsers };
