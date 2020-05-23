//jshint version:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");







const homeStartingContent = "Hey Guys! this is an Under Construction Website For my blogs. Click or press over A.Srivastava for my GitHub . Thanks 😀.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


const postContent = "";

const app = express();
app.set('view engine', 'ejs');



app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

// connecting mongoose-mongodb with the app
mongoose.connect("mongodb+srv://ayush-blogs:sunshine123@ayush-blogscluster-imtd7.mongodb.net/blogsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});


// creating schema

const blogSchema = new mongoose.Schema({
  title: String,
  content: String
});

const BlogPost = mongoose.model("Blog", blogSchema);



app.get("/", function(req, res) {
  BlogPost.find({}, function(err, posts) {
    if (!err) {
      res.render("home", {
        homeContent: homeStartingContent,
        posts: posts
      });
    }
  });


});
app.get("/about", function(req, res) {
  res.render("about", {
    about: aboutContent
  });
});
app.get("/contact", function(req, res) {
  res.render("contact", {
    contact: contactContent
  });
});
app.get("/compose", function(req, res) {
  res.render("compose");

});
app.post("/compose", function(req, res) {

  let post = {
    title: req.body.titleContent,
    content: req.body.bodyContent
  };



  const blogPost = new BlogPost({
    title: req.body.titleContent,
    content: req.body.bodyContent
  });
  blogPost.save(function(err) {
    if (!err) {
      res.redirect("/");
    }
  });
});
app.get("/posts/:postId", function(req, res) {

      const requestTitle = _.capitalize(req.params.postName);
      const requestedPostId = req.params.postId;
      BlogPost.findOne({
          _id: requestedPostId
        }, function(err, post) {
          if (!err) {
              res.render("post", {
                title: post.title,
                content: post.content
              });
            }
          }
        );

    });
    app.listen(process.env.PORT || 5000, function() {
      console.log("Server 3000 is running");
    });
