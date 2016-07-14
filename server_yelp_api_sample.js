var express = require('express');
var app = express();
app.use('/',express.static('./'));


function initYelp(){
	//Request API access: http://www.yelp.com/developers/getting_started/api_access
	var Yelp = require('yelp');

	// Fill the keys to access Yelp API
	var yelpObj = new Yelp({
	  consumer_key: 'XXX',
	  consumer_secret: 'XXX',
	  token: 'XXX',
	  token_secret: 'XXX',
	});
	return yelpObj;
}

var yelpObj = initYelp();

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
	



app.listen(8081);
