const express = require("express");
const app = express();
app.get("/api/info", (req, res) => {
  res.json({
    name: "wood",
  });
});
app.listen("9092");
