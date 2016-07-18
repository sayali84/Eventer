var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
//views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.set('port', (process.env.PORT || 5000));

function initYelp(){
	//Request API access: http://www.yelp.com/developers/getting_started/api_access
	var Yelp = require('yelp');

	// Fill the keys to access Yelp API
	var yelpObj = new Yelp({
	  consumer_key: process.env.CONSUMER_KEY,
	  consumer_secret: process.env.CONSUMER_SECRET,
	  token: process.env.TOKEN,
	  token_secret: process.env.TOKEN_SECRET
	});
	return yelpObj;
}

var yelpObj = initYelp();

app.get('/', function(request, response) {
	  response.render('pages/index');
	});

app.get('/MakeMyEvent/search/yelp/:location/:term',function(req,resp){
	//resp.json(['abc','def','ghi']);
	var search_location = req.params.location;
	var search_term = req.params.term;
	yelpObj.search({ term: search_term, location: search_location }, function(err, data){
		if(err){ console.log(err);} 
		else{
			 resp.json(data.businesses);
			}
		});
	});
	



app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
