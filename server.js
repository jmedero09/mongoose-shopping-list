//purpose: CRUD functionality on a shopping list
//Tech:mongoDB,mongoose,node,express,javascript
//pseudo
//step 1 declare all global variables
//step 2 create instance of express
//step 3 created all express middleware
//step 4 create all express routes 
//step 4.1 GET,POST,UPDATE,DELETE
//step 5 run server 
//step 5.1 turn on mongo 
//step 5.2 trun on express listen function 


// accept all post request to the items route

	//validate all user input - name 
	//once validated create a new item based on the users input

		//once the create call comces back check if there is an error and respond correctly if so 
		//if this code is reached that means that the items was created 

var express = require('express');

var bodyParser = require('body-parser');
 
var mongoose = require('mongoose');

var config = require('./config');

var Item = require('./models/item')

var app = express();

app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/items',function(req,res){

	Item.find(function(err,items){
		if(err){
			return res.status(500).json({
				message:'Internal Server Error'
			});
		}
		res.json(items);
	});
});
// accept all post request to the items route
app.post('/items',function(req,res){
	//validate all user input
	//once validated create a new item based on the users input
	//req.body.name === the name that is sent to this route 
		console.log(req.body.name);
	Item.create({

		name:req.body.name

	},function(err,item){
		//once the create call comces back check if there is an error and respond correctly if so 
		
		if(err){

			return res.status(500).json({

				message:'Internal Server Error'

			});

		}
		//if this code is reached that means that the items was created 
		res.status(201).json(item);

	});
});
app.delete('/items/:name',function(req,res){
	var name = req.params.name
	console.log(name);
	Item.findOneAndRemove({

		name:name

	},function(err,results){

		if(err){

			return res.status(500).json({

				message:'Internal Server Error'

			});
		}
		res.status(201).json({message:req.params.name+" removed"});
	});
});

app.put('/items/:name',function(req,res){

var name = req.params.name

	Item.findOneAndUpdate({name:name},{name:req.body.name},function(err,person){

		if(err){

			console.log(err);

			return res.status(500).json({

				message:'Internal Server Error'

			});
		}

		res.status(201).json(req.body.name);

				console.log(req.body.name);

	});

});

app.use('*',function(req,res){

	res.status(404).json({

		message:'NOT FOUND'

	});
});

var runServer = function(callback){
	//config.DATABASE is a call to the config file to connect on that url
	mongoose.connect(config.DATABASE_URL,function(err){

		if(err && callback){

			return callback(err);

		}
		//congifg.port is a call to the config file which is listen on port 8080
		app.listen(config.PORT,function(){

			console.log('Listening on localhost: ' + config.PORT);

			if(callback){

				callback();

			}
		});

	});
}

if(require.main === module){

	runServer(function(err){

		if(err){

			console.error(err);
		}
	});
}

exports.app = app;

exports.runServer = runServer;



//Questions...........................
//1) Line 20 what is tripping up that err statment
//2)Line 25 is the items in res.json(items); refrencing
//the items collection that we created in line 9 of items.js(Item gets lowercased and pluralized)
//3)the find() and Create methods are coming from mongoos correct?
//4)when donig a callback function do we have to use the return
//would i be able to make the function seperate and do the if else there and then just pass in the function for personal readability
//5) in app.post why are we using the comma 
//6) can we go over whats going on with those functions inside the function calls starting to confuse me a bit
//7)what is the item parameter that is getting passed into the function 
//8) why when i visit the delte route with the id that i want to delte why
// does if give me an error. is this because of the way that the database takes in data



