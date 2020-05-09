const personsRouter = require("express").Router();
const Person = require("../models/person");

// getMany
personsRouter.get("/", async (req, res) => {
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
personsRouter.post("/", async (req, res) => {
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
personsRouter.get("/:id", async (req, res) => {
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
personsRouter.delete("/:id", async (req, res) => {
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
personsRouter.put("/:id", async (req, res) => {
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

module.exports = personsRouter;
