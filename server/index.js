const proxy = require("http-proxy-middleware")
const Bundler = require("parcel-bundler")
const express = require("express")

let bundler = new Bundler("client/index.html")

let app = express()

app.use(
  "/api",
  proxy({
    target: "http://super-fullstack-j031.c9users.io:8081", // target host
    changeOrigin: true, // needed for virtual hosted sites
  })
)
app.use(bundler.middleware())

app.get("/api", function(req, res) {
  res.send("<html><body><h1>Hello World</h1></body></html>")
})

app.listen(8081, () => console.log(`Listening`))
