const express=require('express');
const app=express();
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({
        extended:true
}))
const mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/articlesDB",{useNewUrlParser:true, useUnifiedTopology: true });
const ArticleSchema={
        title:String,
        content:String
};
const Article=mongoose.model("Article",ArticleSchema);
app.route("/articles")
.get(function(req,res){
         Article.find(function(err,foundItems){
              if(!err){
                      res.send(foundItems);
              }
         });
})
.post(function(req,res){
    const item2=new Article({
          title:req.body.title,
          content:req.body.content
     });
     item2.save(function(err){
          if(!err){
                res.send("succesfull");
          }
     });
     
})
.delete(function(req,res){ 
    Article.deleteMany({"title":"css"},function(err){
         if(!err){
                 res.send("suceesfully deleted");
         }
    });
});
app.route("/articles/:articleTopic")
.get(function(req,res){
    Article.findOne({title:req.params.articleTopic},function(err,fountitems){
            if(!err){
                    res.send(fountitems);
            }
    })
})
.put(function(req,res){
  Article.findOneAndUpdate({title:req.params.articleTopic},{$set:req.body},{overwrite:true},function(err){
   if(!err){
           res.send("succesfully put updated");
   }
  });
})
.patch(function(req,res){
   Article.findOneAndUpdate({title:req.params.articleTopic},{$set:req.body},{overwrite:true},function(err){
        if(!err){
                res.send("succesfully patch updated");
        }
       });
});





















app.listen(3000,function(req,res){
        console.log("server started");
})