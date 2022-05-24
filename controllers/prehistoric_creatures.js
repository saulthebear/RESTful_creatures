const fs = require("fs")
const express = require("express")

const router = express.Router()

router.get("/", (req, res) => {
  const creatures = JSON.parse(fs.readFileSync("./prehistoric_creatures.json"))
  res.render("prehistoric_creatures/index", { creatures })
})

router.get("/new", (req, res) => {
  console.log("in here")
  res.render("prehistoric_creatures/new.ejs")
})

router.post("/", (req, res) => {
  const newCreatureData = req.body

  let allCreaturesData = JSON.parse(
    fs.readFileSync("./prehistoric_creatures.json")
  )
  allCreaturesData.push(newCreatureData)
  fs.writeFileSync(
    "./prehistoric_creatures.json",
    JSON.stringify(allCreaturesData)
  )
  res.redirect(`/prehistoric_creatures/${allCreaturesData.length - 1}`)
})

router.get("/:id", (req, res) => {
  const id = req.params.id
  const creatures = JSON.parse(fs.readFileSync("./prehistoric_creatures.json"))
  const shownCreature = creatures[id]
  res.render("prehistoric_creatures/show.ejs", { creature: shownCreature })
})

module.exports = router
