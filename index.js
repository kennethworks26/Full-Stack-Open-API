require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("build"));

morgan.token("body", function(req, res) {
  return JSON.stringify(req.body);
});
app.use(
  morgan(
    ":method :url :status :response-time ms - :res[content-length] :body - :req[content-length]"
  )
);

let persons = [
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4
  }
];

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/info", (req, res) => {
  res.send(
    `<h1>Phonebook has info for ${persons.length} people</h1>
    <p>${new Date()}</p>`
  );
});

app.get("/api/persons", async (req, res) => {
  try {
    const docs = await Person.find({})
      .lean()
      .exec();

    res.status(200).json({ data: docs });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
});

app.post("/api/persons", async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({
        error: "name is missing"
      });
    }

    if (!req.body.number) {
      return res.status(400).json({
        error: "number is missing"
      });
    }

    const doc = await Person.create({ ...req.body });
    res.status(201).json({ data: doc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(person => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons.filter(person => person.id !== id);

  res.status(204).end();
});

const PORT = process.env.PORT;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
