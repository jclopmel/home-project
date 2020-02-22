const express 	= require("express");
const router 	= express.Router();

//Getting
router.get("/", (req, res) => {
	res.send("Hi, It is your Home!")
});

//Adding

//Deletions

module.exports = router;