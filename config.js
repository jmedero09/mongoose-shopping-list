exports.DATABASE_URL = process.env.DATABASE_URL ||
						global.DATABASE_URL ||
						(process.env.NODE_ENV ==='production'?
							'mongodb://localhost/shopping-list':
							'mongodb://localhost/shopping-list-dev');
exports.PORT = process.env.PORT || 8080;	

//CAN WE WALK THROUGH WHAT IS GOING ON IN THIS STATMENT 					