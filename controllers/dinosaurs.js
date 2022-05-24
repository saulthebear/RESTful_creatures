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

// GET /dinosaurs/edit/:id -- a view of a form to edit a specific dino @ :id
router.get("/edit/:id", (req, res) => {
  // get the dino data and render the edit form
  const dinosaurs = fs.readFileSync("./dinosaurs.json")
  const dinoData = JSON.parse(dinosaurs)

  // render edit form
  res.render("dinosaurs/edit.ejs", {
    dinoId: req.params.id,
    dino: dinoData[req.params.id],
  })
})

// PUT /dinosaurs/:id -- update a dino @ :id in the database
router.put("/:id", (req, res) => {
  // get the dinos from the dino json
  const dinosaurs = fs.readFileSync("./dinosaurs.json")
  const dinoData = JSON.parse(dinosaurs)
  console.log(req.params.id, req.body)

  // update the dino based on the req.params.id and the req.body
  // req.params = which dino
  // req.body = dino data to updated
  dinoData[req.params.id].name = req.body.name
  dinoData[req.params.id].type = req.body.type

  // write the json file
  fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinoData))

  // redirect to some place that has interesting data
  res.redirect("/dinosaurs") // go back to all dinos
  // res.redirect(`/dinosaurs/${req.params.id}`) // just see this one dino
  // res.send(`update a dino @ ${req.params.id}`)
})

// DELETE /dinosaurs/:id -- DESTROY a dino @ :id
router.delete("/:id", (req, res) => {
  // get the dinos from the dino json
  const dinosuars = fs.readFileSync("./dinosaurs.json")
  const dinoData = JSON.parse(dinosuars)

  // splice dino out of the array (index fro mthe req.params)
  // Array.splice(starting index to remove, how many elements to remove)
  dinoData.splice(req.params.id, 1)

  // save the dino json
  fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinoData))
  // redirect to see all dinos
  // res.send(`DESTROY a poor dino @ ${req.params.id}`)
  res.redirect("/dinosaurs")
})

module.exports = router
