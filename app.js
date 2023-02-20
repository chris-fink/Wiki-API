//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require('ejs');
const mongoose = require('mongoose');
//Sets StrictQuery to false
mongoose.set('strictQuery', false);

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//mongoose URL connection
mongoose.connect('mongodb://localhost:27017/wikiDB', {useNewUrlParser: true});

//Creates new Schema
const articlesSchema = new mongoose.Schema ({
    title: {
        type: String,
        required: [, 'No title specified.']
    },
    content: {
        type: String,
        required: [, 'No content provided.']
    },
});

const Article = mongoose.model('Article', articlesSchema);


//Request targeting all Articles//
app.route('/articles')
  .get(function(req, res){
    Article.find(function(err, foundArticles){
      if (!err) {
        res.send(foundArticles);
      } else {
        res.send(err);
      }
    });
  })
  .post(function(req, res){
    Article.find(function(err, foundArticles){
      if (!err) {
        res.send(foundArticles);
      } else {
        res.send(err);
      }
    });
  })
  .delete(function(req, res){
    Article.deleteMany(function(err){
      if (!err) {
        res.send('Successfully deleted all articles.');
      } else {
        res.send(err);
      }
    });
  });

  //Request targeting a Specific Article//
  app.route('/articles/:articleTitle')
    .get(function(req, res){
      Article.findOne({title: req.params.articleTitle}, function(err, foundArticle){
        if (foundArticle) {
          res.send(foundArticle);
        } else {
          res.send('No article found.');
        }
      });
    });

  app.post('/articles');
  
  app.delete('/articles');

  app.listen(3000, function() {
    console.log("Server started on port 3000");
  });

//Creates new Schema
// const itemsSchema = new mongoose.Schema ({
//     name: {
//         type: String,
//         required: [, 'No item specified.']
//     },
// });

// const Item = mongoose.model('Item', itemsSchema);

// const item1 = new Item ({
//     name: 'Welcome to your Todo List!'
// });
// const item2 = new Item ({
//     name: 'Hit the + button to add a new item.'
// });
// const item3 = new Item ({
//     name: '<-- Hit this to delete an item.'
// });

// const defaultItems = [item1, item2, item3];

// const listSchema = {
//     name: String,
//     items: [itemsSchema]
//   };
  
//   const List = mongoose.model("List", listSchema);
  
  
//   app.get("/", function(req, res) {
  
//     Item.find({}, function(err, foundItems){
  
//       if (foundItems.length === 0) {
//         Item.insertMany(defaultItems, function(err){
//           if (err) {
//             console.log(err);
//           } else {
//             console.log("Successfully saved default items to DB.");
//           }
//         });
//         res.redirect("/");
//       } else {
//         res.render("list", {listTitle: "Today", newListItems: foundItems});
//       }
//     });
  
//   });
  
//   app.get("/:customListName", function(req, res){
//     const customListName = _.capitalize(req.params.customListName);
  
//     List.findOne({name: customListName}, function(err, foundList){
//       if (!err){
//         if (!foundList){
//           //Create a new list
//           const list = new List({
//             name: customListName,
//             items: defaultItems
//           });
//           list.save();
//           res.redirect("/" + customListName);
//         } else {
//           //Show an existing list
  
//           res.render("list", {listTitle: foundList.name, newListItems: foundList.items});
//         }
//       }
//     });
  
  
  
//   });
  
//   app.post("/", function(req, res){
  
//     const itemName = req.body.newItem;
//     const listName = req.body.list;
  
//     const item = new Item({
//       name: itemName
//     });
  
//     if (listName === "Today"){
//       item.save();
//       res.redirect("/");
//     } else {
//       List.findOne({name: listName}, function(err, foundList){
//         foundList.items.push(item);
//         foundList.save();
//         res.redirect("/" + listName);
//       });
//     }
//   });
  
//   app.post("/delete", function(req, res){
//     const checkedItemId = req.body.checkbox;
//     const listName = req.body.listName;
  
//     if (listName === "Today") {
//       Item.findByIdAndRemove(checkedItemId, function(err){
//         if (!err) {
//           console.log("Successfully deleted checked item.");
//           res.redirect("/");
//         }
//       });
//     } else {
//       List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}, function(err, foundList){
//         if (!err){
//           res.redirect("/" + listName);
//         }
//       });
//     }
  
  
//   });

  