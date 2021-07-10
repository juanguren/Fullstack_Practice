const express = require("express");
const PORT = 5000 || 3000;
const app = express();
const handleEmailOperation = require("./src/sendGrid");

app.use(express.json());
app.use(express.urlencoded());

app.get("/", (_req, res) => {
  res.status(200).json({ msg: "HEY" });
});

app.post("/sendOrder", handleEmailOperation);

app.listen(PORT, () => {
  console.log("Listening in port " + PORT);
});
