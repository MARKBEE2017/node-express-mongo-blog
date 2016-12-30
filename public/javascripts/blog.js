/**
 * Created by xuwk on 2016/12/12.
 */
$(function () {
    $(".btn-menu-icon").each(
        function () {
            $(this).hover(function () {
                $(this).find(".wrak").removeClass("btn-menu-hide").addClass("btn-menu-show");
            },function () {
                $(this).find(".wrak").removeClass("btn-menu-show").addClass("btn-menu-hide");
            })
        }
    );

    $(".reg-username").blur(function () {
        $.ajax({
            data:{sRole:"2",name:$(this).val()},
            url:"/blog/detail",
            type:"POST",
            dataType:'json',
            success:function (msg) {
              if(msg.msg==1){
                  $(".tishi").html("该用户名已经被注册过，请重新输入");
                  $(".reg-username").focus().addClass("red-border");
              }else{
                  $(".tishi").html("");
                  $(".reg-username").removeClass("red-border");
              }
            },
            error:function (err) {
                console.log(err)
            }
        });
    });
    $("body").keydown(function() {
        if (event.keyCode == "13") {//keyCode=13是回车键
            if($(".reg-ensure").val()!=$(".reg-pwd").val()){
                $(".tishi").html("两次输入密码不相同，请重新设置");
                $(".reg-ensure").addClass("red-border");
                $(".reg-btn").attr("disabled","true");
            }else{
                $(".tishi").html("");
                $(".reg-ensure").removeClass("red-border");
                $(".reg-btn").removeAttr("disabled");
            }
        }
    });

    $(".reg-ensure").blur(function () {
         if($(this).val()!=$(".reg-pwd").val()){
             $(".tishi").html("两次输入密码不相同，请重新设置");
             $(".reg-ensure").addClass("red-border");
             $(".reg-btn").attr("disabled","true");
         }else{
             $(".tishi").html("");
             $(".reg-ensure").removeClass("red-border");
             $(".reg-btn").removeAttr("disabled");
         }
    });
    
    $(".destroySession").click(function () {
        $.ajax({
            data:{role:"1"},
            url:"/blogEdits",
            type:"POST",
            dataType:'json',
            success:function (msg) {
                if(msg.msg==1){
                    window.location.href="/blog/user/login";
                }
            },
            error:function (err) {
                console.log(err)
            }
        });
    });

    //类别管理(编辑和删除)
    $(".catEdit").click(function () {
        var catName=$(this).parent().siblings(".cat").html();
        var input=$("<input type='text' value='"+catName+"'><button class='update_cat'>确认</button><button class='cancel'>取消</button>");
        $(this).parent().siblings(".cat").html(input);
        $(this).parent().siblings(".cat").find(".cancel").click(function () {
            $(this).parent().html(catName);
        });

        //类别管理编辑事件
        $(this).parent().siblings(".cat").find(".update_cat").click(function () {  //更新博客分类 通过ajax发送请求修改

            if($(this).siblings("input").val()==""){
                alert("不能为空");
            }else{
                $.ajax({
                    data:{role:"4",catNameNew:$(this).siblings("input").val(),catNameOld:catName},
                    url:"/blogEdits",
                    type:"POST",
                    dataType:'json',
                    success:function (msg) {
                        if(msg.msg==1){
                            $(this).parent().html($(this).siblings("input").val());
                            location.reload();
                        }
                    },
                    error:function (err) {
                        console.log(err)
                    }
                });
            }
        });

        //类别管理删除事件 (觉得没有那必要  所以不支持)
        // $(this).parent().siblings(".cat").find(".catDel").click(function () {
        //
        // })

    });

    //类别管理(上传新的分类)
    $('.addCats').click(function () {
        if($("#catsNew").val()==""){
            return false;
        }else {
           $.ajax({
               data:{role:"5",catsAdd:$("#catsNew").val()},
               url:"/blogEdits",
               type:"POST",
               dataType:'json',
               success:function (msg) {
                   if(msg.msg==0){   //数据库已经存在该分类
                       $('.fff').show();
                   }else if(msg.msg==1){
                       
                       location.reload();
                   }
               },
               error:function (err) {
                   console.log(err)
               }
           });
        }
    });





    //博客查看全文

    $(".readAll").click(function () {
        $.ajax({
            url: '/blog/detail/Article',
            type: 'GET',
            data: {name:$(this).siblings().find(".name").html(), title:$(this).parent().siblings("h3").html()},
            success: function (msg) {
               window.location.href="/blog/detail/Article?name="
            },
            error: function (err) {
                console.log("err")
            }
        });
    });
    
});