const proxy = require("http-proxy-middleware")
const Bundler = require("parcel-bundler")
const app = require("express")()
const port = process.env.BACK_PORT || 8081
/*
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
*/
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

app.get("/hello", function(req, res) {
  res.send({data: `Hello from backend running at ${port}`})
})

app.listen(port, () => console.log(`Express: Listening at ${port}`))
