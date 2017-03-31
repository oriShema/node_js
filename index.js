require('@google-cloud/debug-agent').start({ allowExpressions: true });

const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest((req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push it into the Realtime Database then send a response
  var root = admin.database().ref('/user-lists/'+original).once('value').then(function(snapshot) {
	var str = "";
	snapshot.forEach(function(childSnapshot) {
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();
	console.log(childKey);
    str += childKey +", " + childData+"/n";
  });
	
	res.send("Success "+ str);
  });
  
});