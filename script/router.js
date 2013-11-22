/**
 * Created with IntelliJ IDEA.
 * User: hjshin
 * Date: 2013. 10. 29.
 * Time: 오후 3:30
 * To change this template use File | Settings | File Templates.
 */
define(function(require) {
    var $ = require("jquery");
    var Backbone = require("backbone");
    var Cookies = require("cookies");

    var MainRouter = Backbone.Router.extend({
        routes : {
            /* 가입시 email 확인 결과 페이지 */
            'success':'joinSuccessRoute',
            'fail':'joinFailRoute',
            /* TeamProject 홈페이지 */
            '' : 'homeRoute',
            'section1':'homeRoute1',
            'section2':'homeRoute2',
            'section3':'homeRoute3',
            'section4':'homeRoute4',
            /* TeamProject 기능 페이지 */
            'main' : 'mainRoute',
            'detail/:todoid' : 'detailRoute',
            'login' : 'loginRoute',
            'join' : 'joinRoute',
            'reset' : 'resetRoute'
        },

        initialize: function() {
        },
        /*
         * panel clear 함수.
         */
        clearPanel: function() {
            $(".left-panel").empty();
            $(".center-panel").empty();
            $(".right-panel").empty();
        },

        /*
         * 이메일 인증 결과 페이지.
         */
        joinSuccessRoute : function() {
            require(["success"], function(Success) {
                Success.el = $('body');
                Success.render();
                Success.viewDidAppear();
            });
        },
        joinFailRoute : function() {
            require(["fail"], function(Fail) {
                Fail.el = $('body');
                Fail.render();
                Fail.viewDidAppear();
            });
        },

        /*
         * 홈페이지 화면
         */
        checkCSS: function() {
            if($("link[href='/style/home/home.css']").length == 0) {
                // CSS가 unload된 경우 재로드 한다.
                var link = document.createElement("link");
                link.type = "text/css";
                link.rel = "stylesheet";
                link.href = "/style/home/home.css";
                document.getElementsByTagName("head")[0].appendChild(link);
            }
        },

        homeRoute : function() {
            this.checkCSS();
            require(["home"], function(Home) {
                var __home = new Home({section:"section1"});
                __home.el = $('body');
                __home.render();
                __home.viewDidAppear();
            });
        },
        homeRoute1 : function() {
            this.checkCSS();
            require(["home"], function(Home) {
                var __home = new Home({section:"section1"});
                __home.el = $('body');
                __home.render();
                __home.viewDidAppear();
            });

        },
        homeRoute2 : function() {
            this.checkCSS();
            require(["home"], function(Home) {
                var __home = new Home({section:"section2"});
                __home.el = $('body');
                __home.render();
                __home.viewDidAppear();
            });

        },
        homeRoute3 : function() {
            this.checkCSS();
            require(["home"], function(Home) {
                var __home = new Home({section:"section3"});
                __home.el = $('body');
                __home.render();
                __home.viewDidAppear();
            });

        },
        homeRoute4 : function() {
            this.checkCSS();
            require(["home"], function(Home) {
                var __home = new Home({section:"section4"});
                __home.el = $('body');
                __home.render();
                __home.viewDidAppear();
            });

        },

        /*
         * 메인 화면 (인증 확인 필수)
         */
        mainRoute : function() {
            if(Cookies.getCookie("teamproject_email") == null) {
                this.navigate("login", true);
            } else {
                this.checkBasicPanel();
                this.clearPanel();
                require(["view/basicLayout"], function(BasicLayout) {
                    var __basicLayout = new BasicLayout({mode:"main"});
                    __basicLayout.render();
                    __basicLayout.viewDidAppear();
                });
            }
        },

        /*
         * TODO 상세 화면
         */
        detailRoute: function(todoid) {
            if(Cookies.getCookie("teamproject_email") == null) {
                this.navigate("login", true);
            } else {
                this.checkBasicPanel();
                this.clearPanel();
                require(["view/basicLayout"], function(BasicLayout) {
                    var __basicLayout = new BasicLayout({mode:"detail", todoid:todoid});
                    __basicLayout.render();
                    __basicLayout.viewDidAppear();
                });
            }
        },

        checkBasicPanel: function() {
            // Home.html에서 로드된 home.css 제거
            $("link[href='/style/home/home.css']").remove();

            if($("body div.wrap").length == 0 ||
                $("body div.wrap div.left-panel").length == 0 ||
                $("body div.wrap div.center-panel").length == 0 ||
                $("body div.wrap div.right-panel").length == 0) {
                $("body").empty();
                $("body").append("<div class='wrap'></div>");
                $("body div.wrap").append("<div class='left-panel'></div>");
                $("body div.wrap").append("<div class='center-panel'></div>");
                $("body div.wrap").append("<div class='right-panel'></div>");
            }
        },
        /*
         * 로그인 화면
         */
        loginRoute : function() {
            this.checkBasicPanel();
            this.clearPanel();
            require(["view/login/loginView"], function(LoginView) {
                LoginView.el = $("body div.wrap div.center-panel");
                LoginView.render();
                LoginView.viewDidAppear();
            });

        },

        /*
         * 회원가입 화면
         */
        joinRoute : function() {
            this.checkBasicPanel();
            this.clearPanel();
            require(["view/join/joinView"], function(JoinView) {
                JoinView.el = $("body div.wrap div.center-panel");
                JoinView.render();
                JoinView.viewDidAppear();
            });
        },

        /*
         * 비밀번호 초기화 화면
         */
        resetRoute : function() {
            this.checkBasicPanel();
            this.clearPanel();
            require(["view/reset/resetView"], function(ResetView) {
                ResetView.el = $("body div.wrap div.center-panel");
                ResetView.render();
                ResetView.viewDidAppear();
            });
        }
    });

    new MainRouter();

    Backbone.history.start();
});
