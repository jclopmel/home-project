const express 	= require("express");
const mongoDB 	= require("mongodb").MongoClient;
const ObjectId 	= require('mongodb').ObjectID;
const router 	= express.Router();
const dbName 	= "home_db";
const uri 		= "mongodb://admin:qwerty123456.@ds363058.mlab.com:63058/"+dbName;

//Get Method Actions
router.get("/", (req, res) => {
	let collectionName = req.query["collection"];

	mongoDB.connect(uri, { useUnifiedTopology: true }, (err, database)=>{
		if (err) throw err;

		let db = database.db(dbName)
		let collection = db.collection(collectionName);

		collection.find().toArray((err, data) => {
			if (err) throw err;
			
			let temp = [];
			data.forEach((e)=>{
				temp.push({
					id: 		e._id.toString(),
					name: 		e.product,
					quantity: 	e.quantity,
					icon: 		e.icon,
				})
			})

			res.send(temp)
			database.close();
		})

	});
	
});

//Post Method Actions
router.post("/", (req, res) => {
	let action = req.query["action"];
	let collectionName = req.query["collection"];

	switch(action){
		case "add":
			var val 	= JSON.parse(req.query["val"]);
			var product = (val.name).toString();
			var quantity = parseInt(val.quantity);
			var icon 	= (val.icon).toString();

			var obj = {
				product: product,
				quantity: quantity,
				icon: icon
			}
			
			mongoDB.connect(uri, { useUnifiedTopology: true }, (err, database)=>{
				if (err) throw err;

				let db = database.db(dbName)
				let collection = db.collection(collectionName);

				try {
					collection.insertOne( obj, (err, result) => {
						if (err) throw err;
						res.send(result);
						database.close();
					});

				}catch(e){
					console.log(e);
					database.close();
				}


			});

		break;
		case "modify":
			var val 	= JSON.parse(req.query["val"]);

			var id 		= (val.id).toString();
			var product = (val.name).toString();
			var quantity = parseInt(val.quantity);
			var icon 	= (val.icon).toString();

			var obj = {
				product: product,
				quantity: quantity,
				icon: icon
			}

			if(id != undefined && product != undefined && quantity != NaN && icon != undefined){			

				mongoDB.connect(uri, { useUnifiedTopology: true }, (err, database)=>{
					if (err) throw err;

					let db = database.db(dbName)
					let collection = db.collection(collectionName);

					try {
						let query = { "_id" : ObjectId(id) };
						let newVal = { $set: obj };
						collection.updateOne(query, newVal, (err, result) => {
							if (err) throw err;
							res.send(result);
							database.close();
						});
					}catch(e){
						console.log(e);
						database.close();
					}


				});
			}

		break;
		case "":
			res.send("Not implemented")
		break;
	}
	
});

//Delete Method Actions
router.delete("/", (req, res) => {
	let collectionName = req.query["collection"];
	var id = req.query["id"];
	
	mongoDB.connect(uri, { useUnifiedTopology: true }, (err, database)=>{
		if (err) throw err;

		let db = database.db(dbName)
		let collection = db.collection(collectionName);

		try {
			let query = { "_id" : ObjectId(id) };
			collection.deleteOne(query, (err, result) => {
				if (err) throw err;
				res.send(result);
				database.close();
			});

		}catch(e){
			console.log(e);
			database.close();
		}

	});

	
});

module.exports = router;