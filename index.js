//require Express NPM library
const express = require("express");
const cors = require("cors");
// initialize dotenv
require("dotenv").config();

//import middlewares
/* const auth = require("./middlewares/auth"); */

//import database
const db = require("./db/models");
const { posts } = db;

//import controllers 
const BaseController = require("./controllers/baseController.js");

const PostsController = require("./controllers/postsController.js");

//initialize controllers
const baseController = new BaseController();

const postsController = new PostsController(posts);

//import routers

const PostsRouter = require("./routers/postsRouter.js");

//initialize routers

const postsRouter = new PostsRouter(postsController).routes();

//assigning PORT
const PORT = process.env.PORT;

//running the app
const app = express();

//middlewares:
const corsOptions = {
	origin: "http://localhost:3000",
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//using the routers
app.use("/posts", postsRouter);


/*  app.get('/jwtTest', auth, (req, res) => res.json({ msg: 'From JWT auth, you are in!' })) */
// Start the server
app.listen(PORT, () => {
	console.log(`Example app listening on port ${PORT}!`);
});