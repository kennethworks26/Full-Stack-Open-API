const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

// getMany
blogsRouter.get("/", async (req, res) => {
  try {
    const docs = await Blog.find({})
      .lean()
      .exec();

    res.status(200).json({ data: docs });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
});

// createOne
blogsRouter.post("/", async (req, res) => {
  try {
    const doc = await Blog.create({ ...req.body });
    res.status(201).json({ data: doc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
});

// getOne
blogsRouter.get("/:id", async (req, res) => {
  try {
    const doc = await Blog.findOne({ _id: req.params.id })
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
blogsRouter.delete("/:id", async (req, res) => {
  try {
    const removed = await Blog.findOneAndRemove({
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
blogsRouter.put("/:id", async (req, res) => {
  try {
    const updatedDoc = await Blog.findOneAndUpdate(
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

module.exports = blogsRouter;
