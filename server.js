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







