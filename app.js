const express = require('express');

const app = express();

app.get("/", (req, res) => {
  res.send("Hola mundo");
});

app.listen(8000, function() {
  console.log("Escuchando en localhost:8000");
});
