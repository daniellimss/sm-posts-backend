const posts = require("../db/models/posts");
const BaseController = require("./baseController");
const { Op } = require("sequelize");

class PostsController extends BaseController {
	constructor(model) {
		super(model);
	}


	//Retrieve all postings - Read all:
	getAllPosts = async (req, res) => {
		try {
			const listings = await this.model.findAll();
			return res.json({ success: true, msg: "postings route is ok!", listings });
		} catch (err) {
			return res.status(400).json({ error: true, msg: err });
		}
	}

	//Retrieve specific posting - Read one:
	getOne = async (req, res) => {
		try {
			const { postID } = req.params;
			const posting = await this.model.findByPk(
				postID
			);
			return res.json(posting);
		} catch (err) {
			console.log(err);
			return res.status(400).json({ error: true, msg: err });
		}
	}

	//Create a new posting - Create one:
	insertOne = async (req, res) => {
		try {
			const {

				title,
				content,

			} = req.body;
			console.log(req.body);
			const newPosting = await this.model.create({
				title: title,
				content: content,
			})
			console.log(newPosting);
			return res.json(newPosting);
		} catch (err) {
			return res.status(400).json({ error: true, msg: err });
		}
	}

	//Update a posting - Update one:
	editPost = async (req, res) => {
		try {
			const { postID } = req.params;
			const findpost = await this.model.findOne({
				where: { id: postID },
			});
			if (findpost === null) {
				console.log("Not found!");
				return res.json({ error: "post is not found" });
			}

			const {
				title,
				content,
			} = req.body;
			const updatedInfo = await this.model.update({
				title: title,
				content: content,
			}, {
				where: {
					id: postID
				},
				returning: true
			}

			)
			return res.json({ msg: "post updated", updatedInfo })
		} catch (err) {
			return res.status(400).json({ error: true, msg: err });
		}
	}

	// Remove a posting - Delete one:
	deletePost = async (req, res) => {
		try {
			const { postID } = req.params;
			console.log(req.params)
			const deletePosting = await this.model.destroy({
				where: {
					id: postID
				}
			});
			console.log(deletePosting)
			res.json({ success: true, msg: "posting deleted" })
		} catch (err) {
			return res.status(400).json({ error: true, msg: err });
		}
	}

}

module.exports = PostsController;