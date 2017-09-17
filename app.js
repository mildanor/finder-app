var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

//App config
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//SCHEMA setup
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

//compile data into a model
var Campground = mongoose.model("Campground", campgroundSchema);

//RESTFUL routes
app.get("/", function(req, res){
	res.render("landing");
});

//INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
	//Get camps from DB
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else {
			es.render("index", {campgrounds: allCampgrounds});
			//rendering data coming back from DB
		}
	});

	
});

//CREATE - add new campground to DB
app.post("/campgrounds", function(req, res){
//get data from form, add to campground array
var name = req.body.name;
var image = req.body.image;
var desc = req.body.description;
var newCampground = {name: name, image: image, description: desc}
//Create new campground and save to DB
 Campground.create(newCampground, function(err, newlyCreated){
	if(err){
		console.log(err);
	} else {
		//redirect to campgrounds page
		res.redirect("/campgrounds");
	}
 })
});
//NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res){
res.render("new.ejs");

});

// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
	//find the campground with provided ID, ID + callback
	//render template for that item
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            //render show template with that campground
            res.render("show", {campground: foundCampground});
        }
    });
})


app.listen(3000, function () {
  console.log('App listening on port 3000!')
})