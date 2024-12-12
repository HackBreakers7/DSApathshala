const express = require("express")
const { exec } = require("child_process")
const fs = require("fs")
const cors = require('cors')

const app = express();
app.use(cors())
app.use(express.json());

app.post("/run", (req, res) => {
  const code = req.body.code;

  // Save the code to a temporary file
  fs.writeFileSync("temp.c", code);

  // Compile and run the code
  exec("gcc temp.c -o temp && ./temp", (err, stdout, stderr) => {
    if (err || stderr) {
      res.json({ output: stderr || err.message });
    } else {
      res.json({ output: stdout });
    }

    fs.unlinkSync("temp.c"); 
    fs.unlinkSync("temp");
  });
});

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
