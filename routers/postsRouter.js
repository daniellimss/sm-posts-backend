const express = require('express');
const router = express.Router();
class PostsRouter {
	constructor(controller) {
		this.controller = controller;
	}
	routes() {
		/* 		router.get('/', this.controller.test); */
		router.get('/', this.controller.getAllPosts);
		router.get('/:postID/post', this.controller.getOne);
		router.post('/newpost', this.controller.insertOne);
		router.put('/:postID/edit', this.controller.editPost);
		router.delete('/:postID', this.controller.deletePost);
		return router;
	}
}
module.exports = PostsRouter;