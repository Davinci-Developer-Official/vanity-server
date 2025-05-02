const fs = require("fs")
const path = require("path")

const filePath = path.join(__dirname,"../auth/data.json")
const data  = fs.readFileSync(filePath,"utf-8")
const parsed = JSON.parse(data)

const {sql} = require("@vercel/postgres")

export default async function handler(req, res) {
  
  if (req.method === 'GET') {
    const response = await sql`SELECT*FROM profile`
    console.log("users fetched",response.rows);
    res.status(200).json(response.rows);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
  
  if (req.method === "POST") {
        const { full_name, email, phone_number, password } = req.body;
        const result = await sql`
      INSERT INTO profile (full_name, email, phone_number, password)
      VALUES (${full_name}, ${email}, ${phone_number}, ${password})
      RETURNING id, full_name, email, phone_number;
    `;
    res.status(201).json({ user: result.rows[0] });

    //   parsed.info.push(data)
    //   // Log to verify data was received
    //   console.log("POST body:",result.rows);
      
    //   res.status(200).json({
    //     message: "hello",
    //     data: parsed.info
    //   });
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }
  }
  