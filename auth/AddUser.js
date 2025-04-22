const fs = require("fs");
const path = require("path");

const FilePath = path.join(__dirname, 'data.json');

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
