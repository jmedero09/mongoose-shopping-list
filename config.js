exports.DATABASE_URL = process.env.DATABASE_URL ||
						global.DATABASE_URL ||
						(process.env.NODE_ENV ==='mongodb://<dbuser>:<dbpassword>@ds049456.mlab.com:49456/mlab-database'?
							'mongodb://localhost/shopping-list':
							'mongodb://localhost/shopping-list-dev');
exports.PORT = process.env.PORT || 8080;	

