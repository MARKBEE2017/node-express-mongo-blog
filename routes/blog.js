var express = require('express');
var router = express.Router();
var mongoose=require("../models/db");
var user=require("../models/user");
var rs=require("rs");
var formidable = require("formidable");
// router.get('/blog', function(req, res, next) {
//     res.render('blog', { title: '博客首页', name: '博客更新'});
// });

// router.get('/blog/user/login',function (req, res, next) {
//     res.render('login',{});
// });

exports.blog1=function (req,res) {
    res.render('blog', { title: '博客首页', name: '博客更新'});
};
exports.login=function (req,res) {
    res.render('login',{});
};
exports.loginError=function (req,res) {
    res.render('loginError',{});
};
exports.reg=function (req, res) {
    res.render('reg',{});
};

var detail=function (req,res) {
  if(req.body.sRole==1) {
      //处理注册
      var query1 = {name: req.body.user, password: req.body.password};
      var entity = new user.User({"name": query1.name, "password": req.body.password, "pic": ""});
      entity.save();
      req.session.username=query1.name;
      req.session.password=query1.password;
      req.session.imgURl="/images/touxiang/Koala.jpg";
      res.render('detail', {
          title:"博客详细页",
          username: query1.name,
          userSession:req.session.username,
          imgUrl:"/images/touxiang/Koala.jpg",
          date: new Date()
      });

  }else if(req.body.sRole==2){    //处理ajax（用户名是否注册过）
      var query2 = {name: req.body.name};
      user.User.find(query2,function (err, docs) {
          if(err){
              res.render('error');
          }else {
                  if(docs.length==1){
                      res.json({msg:1});
                  }else{
                      res.json({msg:0});
                  }
          }
      });
  }
  else if(req.body.sRole==3){   //处理登录
      var imgur2="";
      var query3={name:req.body.user,password:req.body.password};
      user.User.find(query3,function (err, docs) {
          if(err){
              res.render('error');
          }else {
              if(docs.length==0){
                  res.redirect("/loginError");
              }else {
                  if(docs[0]['pic']==""){
                      imgur2="/images/touxiang/Koala.jpg"
                  }else{
                      imgur2=urlHandle(docs[0]['pic'])
                  }
                  req.session.username=query3.name;
                  req.session.password=query3.password;
                  req.session.imgURl=imgur2;
                  res.render('detail',{
                      title:"博客详细页",
                      status:docs,
                      username:query3.name,
                      userSession:req.session.username,
                      imgUrl:imgur2,
                      date:new Date()
                  });
              }
          }
      });
  }
  else if(req.body.sRole==4){ 
      var imgurl3="";
      //处理头像上传
      var query4={name:req.session.username};
      var file = req.files.pic;
      var path = file.path;
      //存储路径
      user.User.update(query4,{$set:{pic:path}},function ( err,docs) {
        
      });
      if(path==""){
          imgurl3="/images/touxiang/Koala.jpg"
      }else{
          imgurl3=urlHandle(path)
      }
      req.session.imgURl=imgurl3;
      res.render('detail',{
          title:"博客详细页",
          username:query4.name,
          userSession:req.session.username,
          imgUrl:imgurl3,
          date:new Date()
      });
  }

  else{
      var imgurl4="";
      var query5={name:req.session.username};
      user.User.find(query5,function (err, docs) {
          if(err){
              res.render('error');
          }else {
              if(docs.length==0){
                  res.redirect("/loginError");
              }else {
                  if(docs[0]['pic']==""){
                      imgurl4="/images/touxiang/Koala.jpg"
                  }else{
                      imgurl4=urlHandle(docs[0]['pic'])
                  }
                  req.session.username=query5.name;
                  req.session.password=query5.password;
                  res.render('detail',{
                      title:"博客详细页",
                      status:docs,
                      username:query5.name,
                      userSession:req.session.username,
                      imgUrl:imgurl4,
                      date:new Date()
                  });
              }
          }
      });
  }
};

exports.detail=detail;




function urlHandle(url) {
    var str=url.replace(/\\/g,"/");
    return str.replace(/public/g,"")
}