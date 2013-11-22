/**
 * Created with IntelliJ IDEA.
 * User: hjshin
 * Date: 2013. 10. 29.
 * Time: 오후 4:44
 * To change this template use File | Settings | File Templates.
 */
define(
    [
        'jquery',
        'backbone',
        'viewbasic',
        'model/user',
        "cookies",
        'template!/template/login/login',
        'style!/style/login/login' ,
        'bootstrap'
    ], function(
        $,
        Backbone,
        ViewBasic,
        User,
        Cookies,
        template
        ){
        var LoginView = Backbone.View.extend({
            el : '.center-panel',
            device_type : "pc",
            initialize: function() {
                this.device_type = ViewBasic.initialize();
            },

            /*
             * 대쉬 보드에서 발생하는 이벤트 정의
             */
            events: {
                // PC,Tablet,Mobile

                // PC,Tablet

                // Mobile
                'click div#login': 'loginClick',
                'click div#join': 'joinClick',
                'click div#resetPW': 'resetPWClick',
                'keyup #loginPW': 'checkReturn'
            },

            /*
             * 아래 메서드들은 각 이벤트가 호출되었을 시 처리할 메서드들 위 event에서 정의된 이벤트가 발생시 호출된다
             */
            // PC,Tablet,Mobile

            // PC,Tablet

            // Mobile
            loginClick: function(e) {
                
                var __this = this;
                
                var user = new User( {
                    id : $('#loginID').val(),
                    pw : $('#loginPW').val()
                });

                var error_alert = $($(__this.el).find(".login .alert"));
                
                user.login(function(a,b,c) {

                    if (a.code == "error") {
                        var messages = [];
                        for(var i in a.message) {
                            if (typeof(a.message[i].msg) != "undefined") {
                                messages.push(" - " + a.message[i].msg);
                            } else {
                                messages.push(" - " + a.message[i]);
                            }
                        }
                        error_alert.html(messages.join("<br />")).show();
                        return;
                    }

                    // 가입성공.
                    user.me(function(a,b,c) {
                        // 내정보 가져오기 성공.
                        if(a.code == "ok") {
                            Cookies.setCookie("teamproject_email", a.message[0].user_id);
                            // alert("로그인 되었습니다.");
                            document.location = "/#main";
                        } else {
                            error_alert.text(a.message).show();
                            // alert("로그인 실패 - " + a.message);
                        }
                    }, function(a,b,c) {
                        // 내 정보 가져오기 실패.
                        error_alert.text(a.message).show();
                        // alert("로그인 실패 - " + a.message);
                    });

                }.bind(this), function(a,b,c) {
                    // 가입실패.
                    // alert("로그인 실패.");
                    error_alert.text("로그인 실패.").show();
                });
            },
            joinClick: function(e) {
                document.location = "/#join";
            },
            resetPWClick: function(e) {
                document.location = "/#reset";
            },

            checkReturn: function(e) {
                if (e.keyCode == 13)
                    this.loginClick(e);
            },

            render: function() {
                $(this.el).empty();
                $(this.el).html(template());
                this.delegateEvents();
                return this;
            },

            /*
             * 이 메서드는 pageTransition.js을 이용해서 사용할 경우에만 사용 가능하다.(*중요)
             */
            viewDidAppear: function() {
            },

            /*
             * 이 메서드는 pageTransition.js을 이용해서 사용할 경우에만 사용 가능하다.(*중요)
             */
            viewDidDisappear: function() {
            }

        });

        return new LoginView;
    });

