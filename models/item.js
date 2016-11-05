var mongoose = require('mongoose');
//ItemSchema should be lowercase
var ItemSchema = new mongoose.Schema({

	name: {type: String, required:true}

});

//converts to lowercase items
var Item = mongoose.model('Item',ItemSchema);

module.exports = Item;

//Here we are requiring mongoose so that we 
//we can set the constraints on the data that
//we will take in 
//here we create a new mongoose.Schema method and 
//call it Item and in this Item we set the constraints
//to have a string and it is required
//we then set var Item to the ItemScheam that we created
//and we call it Item *note Item will be lowercased and plurialized
//by mongo
//we then export the item we created with the constraints on it  