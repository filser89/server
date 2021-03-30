const router = require("express").Router()
const Snippet = require("../models/snippetModel")

router.get('/test', (req, res)=>{
  res.send("Router test")
})

router.post('/', (req, res) =>{
  const {title, description, code} = req.body
  console.log(title, description, code)

  const newSnippet = new Snippet({title, description, code})
  newSnippet.save()
})

module.exports = router

