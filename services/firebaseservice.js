var admin = require('firebase-admin');
var firebaseNodejs = require('firebase-nodejs')
var serviceAccount = require(rootdir+'/config/instbot-35e8a-firebase-adminsdk-9gjfo-c4695511f5.json');
//var serviceAccount = require(rootdir+'/config/awscaas-firebase-adminsdk.json');
var fbConnection =  admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
		databaseURL: "https://instbot-35e8a.firebaseio.com/"
	//databaseURL: "https://awscaas.firebaseio.com/"
		});


module.exports = {
	 
	deleteData: function(url, callback){
		//var obj = {"dialogflow":"10"};
		var deleteStatus =  firebaseNodejs.deleteData(fbConnection,url);
		callback(deleteStatus);
		
	},
	insertData:function(url,payload,callback){
		var insertStatus =  firebaseNodejs.insertData(fbConnection,url,payload);
		callback(insertStatus);
		
	},
	updateData:function(url,payload,callback){
		//var obj = {"dialogflow":"10"};
		var updateStatus =  firebaseNodejs.updateData(fbConnection,url,payload);
		callback(updateStatus);
		
	},	
	getData: function(url,callback){
		//console.log(url)
	firebaseNodejs.selectData(fbConnection, url, 'value', response => {
		//console.log(response)
			callback(response);
		});
	}


}
