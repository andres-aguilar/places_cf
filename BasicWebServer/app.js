const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({extended: false}));

const places = [
  {
    "title": "Oficina1",
    "descriptioin": "Lorem ipsum",
    "address": "Lorem ipsum"
  }, {
    "title": "Oficina2",
    "descriptioin": "Lorem ipsum",
    "address": "Lorem ipsum"
  }, {
    "title": "Oficina3",
    "descriptioin": "Lorem ipsum",
    "address": "Lorem ipsum"
  }, {
    "title": "Oficina4",
    "descriptioin": "Lorem ipsum",
    "address": "Lorem ipsum"
  }
];


app.get("/", (req, res) => {
  res.json(places);
});

app.post("/", (req, res) => {
  // Retornando el mismo contenido recibido
  res.json(req.body);
});

// Static files
app.use(express.static("public"));

app.listen(8000, function() {
  console.log("Escuchando en localhost:8000");
});
