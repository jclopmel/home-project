//Parameters for the server
const express 	= require("express");
const bodyParser= require("body-parser");
const cors 		= require("cors");
const app 		= express();
const host 		= "127.0.0.1";
const port 		= 5000;

//Dependencies app loading
app.use(bodyParser.json());
app.use(cors());

const posts = require("../routes/api/posts");
app.use("/api/posts", posts);

//Server start listening
app.listen(port, host, function () {
  console.log("Server running at http://"+ host +":"+ port + "");
});
