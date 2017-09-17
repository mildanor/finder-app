var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
// array needs to be outside of a route to be abel to receive data
var campgrounds = [
		{name: "Camp1", image: "https://images.pexels.com/photos/127634/pexels-photo-127634.jpeg?w=940&h=650&auto=compress&cs=tinysrgb"},
		{name: "Camp2", image: "https://images.pexels.com/photos/127634/pexels-photo-127634.jpeg?w=940&h=650&auto=compress&cs=tinysrgb"},
		{name: "Camp3", image: "https://images.pexels.com/photos/127634/pexels-photo-127634.jpeg?w=940&h=650&auto=compress&cs=tinysrgb"},
		{name: "Camp4", image: "https://images.pexels.com/photos/127634/pexels-photo-127634.jpeg?w=940&h=650&auto=compress&cs=tinysrgb"}
	];

app.get("/", function(req, res){
	res.render("landing");
});


app.get("/campgrounds", function(req, res){
	res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
//get data from form, add to campground array
var name = req.body.name;
var image = req.body.image;
var newCampground = {name: name, image: image}
campgrounds.push(newCampground);
//redirect to campgrounds page
res.redirect("/campgrounds");
});
app.get("/campgrounds/new", function(req, res){
res.render("new.ejs");

});


app.listen(3000, function () {
  console.log('App listening on port 3000!')
})