class BaseController {
	constructor(model) {
		this.model = model
	}
	test(req, res) {
		res.json({ success: true, msg: "I am shared between all the different controllers" });
	}
}
module.exports = BaseController;