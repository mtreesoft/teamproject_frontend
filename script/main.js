/**
 * Created with IntelliJ IDEA.
 * User: hjshin
 * Date: 2013. 10. 29.
 * Time: 오후 3:09
 * To change this template use File | Settings | File Templates.
 */
//추가 모듈 및 의존성 정의
requirejs.config({
    paths: {
        // view utils
        "transition": Cornerstone.PATH + "util/transition",
        "navigation":"../lib/navigation",
        "viewbasic":"/script/util/viewBasic",
        "mdetect":"/script/util/mdetect",
        "md5":"/script/util/jquery.md5",
        "cookies":"/script/util/cookies",
        "bootstrap":Cornerstone.PATH + "lib/bootstrap/js/bootstrap",
        // utils
        "jsonp": Cornerstone.PATH + "util/jsonp",
        // views
        "success":"/script/view/etc/success",
        "fail":"/script/view/etc/fail",
        "home":"/script/view/home/home",
        "detailview":"/script/view/detail/detailView",
        "commentitem":"/script/view/detail/commentitem",
        "blankcommentitem":"/script/view/detail/blankcommentitem",
        "detailtodoitem":"/script/view/detail/detailtodoitem",
        "blanktodoitem":"/script/view/detail/blanktodoitem",
        "joinview":"/script/view/join/joinView",
        "loginview":"/script/view/login/loginView",
        "todoitem":"/script/view/main/todoitem",
        "mainview":"/script/view/main/mainView",
        "myinfoview":"/script/view/myinfo/myinfoView",
        "resetview":"/script/view/reset/resetView"
    },

    shim: {
        // view utils
        "transition":{
            deps:["jquery"],
            exports: "Transition"
        },

        "navigation": {
            deps:["transition"]
        },

        "viewbasic": {
            deps: ["jquery", "mdetect"],
            exports: "ViewBasic"
        },

        "mdetect": {
            exports: "mdetect"
        },

        "md5": {
            deps:["jquery"],
            exports: "md5"
        },

        "cookies": {
            exports: "cookies"
        },

        "bootstrap": {
            deps: ["jquery"],
            exports: "BootStrap"
        },

        // utils
        "jsonp": {
            deps: ["jquery"],
            exports: "jsonp"
        },
        // views (deps는 각 소스별로 명시하므로 여기서는 생략..)
        "success": {
            exports:"Successs"
        },
        "fail": {
            exports:"Fail"
        },
        "home":{
            exports:"Home"
        },
        "detailview": {
            exports: "DetailView"
        },
        "commentitem": {
            exports: "CommentItem"
        },
        "blankcommentitem": {
            exports: "BlankCommentItem"
        },
        "detailtodoitem": {
            exports: "DetailTodoItem"
        },
        "blanktodoitem": {
            exports: "BlankTodoItem"
        },
        "joinview": {
            exports: "JoinView"
        },
        "loginview": {
            exports: "LoginView"
        },
        "todoitem": {
            exports: "TodoItem"
        },
        "mainview": {
            exports: "MainView"
        },
        "myinfoview": {
            exports: "MyInfoView"
        },
        "resetview": {
            exports: "ResetView"
        }
    }
});

define(['router', 'widget-plugins'], function(Router) {
    return {
        launch: function() {
            // 애플리게이션의 시작점

        }
    }
});