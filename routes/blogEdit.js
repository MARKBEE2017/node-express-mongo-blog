/**
 * Created by xuwk on 2016/12/20.
 */
var express = require('express');
var mongoose=require("../models/db");
var cat=require("../models/cats");
var content=require("../models/content");
var async=require('async');


exports.blog_edit=function (req,res) {
    //查找文章类别
    async.parallel({
        getCat: function (callback) {
            var blog_cats = [];
            cat.Cat.find(function (err, docs) {
                if (err) {
                    res.render('error');
                } else {
                    for (var i = 0; i < docs.length; i++) {
                        blog_cats.push(docs[i].catname)
                    }
                    callback(null, blog_cats)
                }
            });
        },
        getContent:function (callback) {
            content.Content.find({name:req.session.username},function (err, docs) {
                if (err) {
                    res.render('error');
                } else {
                    callback(null, docs)
                }
            });
        }
        
    }, function(err, results){
         console.log(results['getContent'])
            res.render('blogEdits', {
                title:"博客编辑页",
                username:req.session.username,
                userSession:req.session.username,
                imgUrl:req.session.imgURl,
                date:new Date(),
                cats:results['getCat'],
                content:results['getContent']
            });
        });
   
};

//将文本编辑器里的内容传给后台的数据库中
exports.blog_updateBlog=function (req,res) {
    //上传内容
    if(req.body.role==1){   //销毁session
        req.session.username=null;
        res.json({msg:1});
    }else {
        var entity = new content.Content({"name": req.session.username,"title":req.body.title,"content":req.body.con_text,"time":req.body.data,"cat":req.body.cat,click:""});
        entity.save();
        res.json({msg:1});
    }


    
};