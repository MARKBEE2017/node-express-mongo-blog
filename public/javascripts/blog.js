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
    
    
});