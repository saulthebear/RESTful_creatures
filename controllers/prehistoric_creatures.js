const fs = require("fs")
const express = require("express")

const router = express.Router()

// Index route
router.get("/", (req, res) => {
  const creatures = JSON.parse(fs.readFileSync("./prehistoric_creatures.json"))
  res.render("prehistoric_creatures/index", { creatures })
})

// new route - form to add resource
router.get("/new", (req, res) => {
  console.log("in here")
  res.render("prehistoric_creatures/new.ejs")
})

// Create route
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

// Show route - single resource
router.get("/:id", (req, res) => {
  const id = req.params.id
  const creatures = JSON.parse(fs.readFileSync("./prehistoric_creatures.json"))
  const shownCreature = creatures[id]
  res.render("prehistoric_creatures/show.ejs", { creature: shownCreature })
})

// Edit route
router.get("/edit/:id", (req, res) => {
  const id = req.params.id
  const creatures = JSON.parse(fs.readFileSync("./prehistoric_creatures.json"))
  const creature = creatures[id]
  res.render("prehistoric_creatures/edit.ejs", { id, creature })
})

// Update route
router.put("/:id", (req, res) => {
  const id = req.params.id
  let creatures = JSON.parse(fs.readFileSync("./prehistoric_creatures.json"))
  const creature = creatures[id]

  creature.type = req.body.type
  creature.img_url = req.body.img_url

  fs.writeFileSync("./prehistoric_creatures.json", JSON.stringify(creatures))

  res.redirect(`/prehistoric_creatures/${id}`)
})

module.exports = router
