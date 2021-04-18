const router = require("express").Router();
const Snippet = require("../models/snippetModel");

router.get("/", async (_req, res) => {
  try {
    const snippets = await Snippet.find();
    res.json(snippets);
  } catch (err) {
    res.status(500).send();
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, description, code } = req.body;

    // validation
    if (!description && !code)
      return res.status(400).json({
        errorMessage: "You need to enter at least a description or code",
      });

    const newSnippet = new Snippet({ title, description, code });
    const savedSnippet = await newSnippet.save();
    res.json(savedSnippet);
  } catch (err) {
    res.status(500).send();
  }
});

router.put("/:id", async (req, res) => {
  try {
    const snippetId = req.params.id; //id passed in the params
    // validations
    if (!snippetId)
      res
        .status(400)
        .json({ errorMessage: "No id passed. Please contact the developer" });

    const requiredFields = ["description", "code"];
    if (!validateData(requiredFields, req.body))
      return res.status(400).json({
        errorMessage: "You need to enter at least a description or code",
      });

    const originalSnippet = await Snippet.findById(snippetId);
    if (!originalSnippet)
      res.status(400).json({
        errorMessage: "No snippet found. Please contact the developer",
      });

    const updatedSnippet = updateSnippet(req.body, originalSnippet);
    console.log(updatedSnippet);
    const savedSnippet = await updatedSnippet.save();
    res.json(savedSnippet);
  } catch (err) {
    res.status(500).send();
  }
});

router.delete("/:id", async (req, res) => {
  try {
    console.log(req);
    const snippetId = req.params.id;
    // validations
    if (!snippetId)
      res
        .status(400)
        .json({ errorMessage: "No id passed. Please contact the developer" });
    const existingSnippet = await Snippet.findById(snippetId);
    if (!existingSnippet)
      res.status(400).json({
        errorMessage: "No snippet found. Please contact the developer",
      });
    await existingSnippet.delete();
    res.json(existingSnippet);
  } catch (err) {
    res.status(500).send();
  }
});

const updateSnippet = (data, snippet) => {
  const attributes = Object.keys(data);
  attributes.forEach((attr) => {
    snippet[attr] = data[attr];
  });
  return snippet;
};

const validateData = (required, data) => {
  const fields = Object.keys(data);
  return required.some((attr) => fields.includes(attr));
};
module.exports = router;
