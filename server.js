const express = require("express");
const app = express();
const multer = require("multer");
const upload = multer();
const cors = require("cors");

// Cors used for FCC testing purposes
app.use(cors({ optionSuccessStatus: 200 }));

// Serving styles and scripts from public dir
app.use(express.static("public"));

// Main route defined
app.get("/", (req, res) => res.sendFile(`${__dirname}/views/index.html`));

// POST form object that includes a file upload.
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  if (!req.file) return res.json({ error: "Select a file to upload" });

  const { originalname, mimetype, size } = req.file;

  res.json({ name: originalname, type: mimetype, size: size });
});

// Server listening
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running at port ` + port));
