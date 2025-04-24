const fs = require("fs");
const path = require("path");
const express = require("express")
const cors = require('cors')

const app  = express()
const FilePath = path.join(__dirname, 'data.json');
app.use(cors())
app.use(express.json())
require('dotenv').config({ path: '.env.development.local' })
const base_url = process.env.END_POINT
const host = "0.0.0.0" //ensures it listens on all network interfaces


function AddUser(req, res) {
    const newUser = req.body;

    // Read file with encoding
    const data = fs.readFileSync(FilePath, 'utf-8');

    // Parse JSON correctly
    const arr = JSON.parse(data);

    // Add user to info array
    arr.info.push(newUser);

    // Write updated JSON back to file
    fs.writeFileSync(FilePath, JSON.stringify(arr, newUser, 2), 'utf-8');

    // Send response
    res.status(200).json({ message: 'Data added!', item: newUser });
}

module.exports = { AddUser };
