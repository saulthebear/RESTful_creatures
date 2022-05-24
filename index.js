const express = require("express")
const ejsLayout = require("express-ejs-layouts")
const browserSync = require("browser-sync")
const fs = require("fs")
const methodOverride = require("method-override")

const dinosaurs = require("./controllers/dinosaurs.js")
const prehistoric_creatures = require("./controllers/prehistoric_creatures.js")

const app = express()
const PORT = 3000

// You can conditionally add routes and behavior based on environment
const isProduction = "production" === process.env.NODE_ENV

app.set("etag", isProduction)

// Use ejs for templates
app.set("view engine", "ejs")

// MIDDLEWARE
app.use((req, res, next) => {
  res.removeHeader("X-Powered-By")
  next()
})
app.use(express.static("public"))
app.use(ejsLayout)
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"))
app.use("/dinosaurs", dinosaurs)
app.use("/prehistoric_creatures", prehistoric_creatures)

// <-- Routes
app.get("/", (req, res) => {
  res.render("home")
})

// Start demo server
app.listen(PORT, listening)

function listening() {
  console.log(`👂 Listening on http://localhost:${PORT}`)
  if (!isProduction) {
    // https://ponyfoo.com/articles/a-browsersync-primer#inside-a-node-application
    browserSync({
      files: [".{html,js,css}"],
      online: false,
      open: false,
      port: PORT + 1,
      proxy: "localhost:" + PORT,
      ui: false,
    })
  }
}
