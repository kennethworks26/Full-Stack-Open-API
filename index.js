require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("build"));

// Logging
morgan.token("body", function(req, res) {
  return JSON.stringify(req.body);
});
app.use(
  morgan(
    ":method :url :status :response-time ms - :res[content-length] :body - :req[content-length]"
  )
);

// getMany
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

// createOne
app.post("/api/persons", async (req, res) => {
  console.log(req);
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

// getOne
app.get("/api/persons/:id", async (req, res) => {
  try {
    const doc = await Person.findOne({ _id: req.params.id })
      .lean()
      .exec();

    if (!doc) {
      return res.status(400).end();
    }

    res.status(200).json({ data: doc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
});

// removeOne
app.delete("/api/persons/:id", async (req, res) => {
  try {
    const removed = await Person.findOneAndRemove({
      _id: req.params.id
    });

    if (!removed) {
      return res.status(400).end();
    }

    return res.status(200).json({ data: removed });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
});

// updateOne
app.put("/api/persons/:id", async (req, res) => {
  try {
    const updatedDoc = await Person.findOneAndUpdate(
      {
        _id: req.params.id
      },
      req.body,
      { new: true }
    )
      .lean()
      .exec();

    if (!updatedDoc) {
      return res.status(400).end();
    }

    res.status(200).json({ data: updatedDoc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
});

const PORT = process.env.PORT;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
