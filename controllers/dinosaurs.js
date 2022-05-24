const fs = require("fs")
const express = require("express")
const router = express.Router()

// index route
router.get("/", (req, res) => {
  let dinos = JSON.parse(fs.readFileSync("./dinosaurs.json"))

  let nameFilter = req.query.nameFilter

  if (nameFilter !== undefined && nameFilter !== null) {
    dinos = dinos.filter(
      (dino) => dino.name.toLowerCase() === nameFilter.toLowerCase()
    )
  }

  res.render("dinosaurs/index.ejs", { dinos })
})

router.post("/", (req, res) => {
  const newDinosaurData = req.body

  let allDinosaursData = JSON.parse(fs.readFileSync("./dinosaurs.json"))
  allDinosaursData.push(newDinosaurData)
  fs.writeFileSync("./dinosaurs.json", JSON.stringify(allDinosaursData))
  res.redirect(`/dinosaurs/${allDinosaursData.length - 1}`)
})

// new route (form for creating a dino)
router.get("/new", (req, res) => {
  res.render("dinosaurs/new.ejs")
})

// show route
router.get("/:id", (req, res) => {
  const id = Number(req.params.id)
  const dinos = JSON.parse(fs.readFileSync("./dinosaurs.json"))
  const dino = dinos[id]
  res.render("dinosaurs/show", { dino })
})

module.exports = router
