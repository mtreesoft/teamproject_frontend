/**
 * Created with IntelliJ IDEA.
 * User: hjshin
 * Date: 2013. 10. 29.
 * Time: 오후 6:25
 * To change this template use File | Settings | File Templates.
 */
define(
    [
        'jquery',
        'backbone',
        'viewbasic',
        'model/user',
        'cookies',
        'template!/template/myinfo/myinfo',
        'style!/style/myinfo/myinfo',
        'bootstrap'
    ], function(
        $,
        Backbone,
        ViewBasic,
        User,
        Cookies,
        template
        ){
        var MyInfoView = Backbone.View.extend({
            device_type : "pc",
            user: new User(),
            editmode: false,
            initialize: function() {
                this.device_type = ViewBasic.initialize();

            },

            /*
             * 대쉬 보드에서 발생하는 이벤트 정의
             */
            events: {
                // PC,Tablet,Mobile
                'click button#editbtn':'goEdit',
                'click button#logoutbtn':'logoutClick',
                'click button#editsavebtn':'goEditSave',
                'click button#editcancelbtn':'goEdit',
                // PC,Tablet

                // Mobile
                'click a#btnGoMain': 'goMainClick'

            },

            /*
             * 아래 메서드들은 각 이벤트가 호출되었을 시 처리할 메서드들 위 event에서 정의된 이벤트가 발생시 호출된다
             */
            // PC,Tablet,Mobile
            showItem: function() {
                if(this.editmode) {
                    $('div.showmode').addClass('hideblock');
                    $('div.showmode').removeClass('showblock');
                    $('div.editmode').addClass('showblock');
                    $('div.editmode').removeClass('hideblock');
                    $('div.showmode-btns').addClass('hideblock');
                    $('div.showmode-btns').removeClass('showblock');
                    $('div.editmode-btns').addClass('showblock');
                    $('div.editmode-btns').removeClass('hideblock');
                } else {
                    $('div.showmode').addClass('showblock');
                    $('div.showmode').removeClass('hideblock');
                    $('div.editmode').addClass('hideblock');
                    $('div.editmode').removeClass('showblock');
                    $('div.showmode-btns').addClass('showblock');
                    $('div.showmode-btns').removeClass('hideblock');
                    $('div.editmode-btns').addClass('hideblock');
                    $('div.editmode-btns').removeClass('showblock');
                }
            },
            goEdit:function(e) {
                this.editmode = !this.editmode;
                this.showItem();
            },
            goEditSave:function(e) {
                if($("#editPW").val() == undefined ||
                    $("#editPW").val() == null ||
                    $("#editPW").val() != $("#editPWConfirm").val()) {
                    alert("비밀번호를 확인해 주세요");
                    return;
                }

                var __this = this;
                var editUser = new User({
                    name: $("#editName").val(),
                    pw: $("#editPW").val()
                });
                editUser.edit(function(a, b, c) {
                    if(a.code == "ok") {
                        alert("변경성공");
                        __this.loadData();
                        __this.goEdit();
                    } else {
                        alert("변경실패 - " + a.message);
                    }
                }, function(a, b, c){
                    alert("변경실패");
                });
                $("#editPW").val("");
                $("#editPWConfirm").val("");
            },
            // PC,Tablet

            // Mobile
            goMainClick: function(e) {
                document.location = '/#main';
            },
            logoutClick: function(e) {
                this.user.logout(function(a,b,c) {
                    // 가입성공.
                    alert("로그아웃 되었습니다.");
                    Cookies.removeCookie("teamproject_email");
                    location.reload();
                }, function(a,b,c) {
                        // 가입실패.
                        alert("로그아웃 실패.");
                    });

            },

            render: function() {
                $(this.el).empty();
                $(this.el).html(template());
                this.showItem();
                this.delegateEvents();
                return this;
            },

            /*
             * 이 메서드는 pageTransition.js을 이용해서 사용할 경우에만 사용 가능하다.(*중요)
             */
            dateformat: function(date) {
                var formatted_date = "";
                formatted_date += date.getFullYear() + ".";
                formatted_date += (date.getMonth()+1) + ".";
                formatted_date += date.getDate();

                return formatted_date;
            },
            loadData: function() {
                var __this = this;
                this.user.me(function(a,b,c) {
                    // 내정보 가져오기 성공.
                    if(a.code == "ok") {
                        var imgpath = a.message[0].pic + "&s=100";
                        $('div.myinfo div.info img.profileimg').attr("src", imgpath);
                        if(a.message[0].name == undefined || a.message[0].name == null) {
                            $('div.myinfo div.info div.showmode div.name').text("No Name");
                        } else {
                            $('div.myinfo div.info div.showmode div.name').text(a.message[0].name);
                            $('input#editName').val(a.message[0].name);
                        }
                        $('div.myinfo div.info div.showmode div.email').text(a.message[0].user_id);
                        $('div#edit_email').text(a.message[0].user_id);
                        $('div.myinfo div.info div.showmode div.regdate').text(__this.dateformat(new Date(a.message[0].reg_date)));
                        $('div#edit_regdate').text(__this.dateformat(new Date(a.message[0].reg_date)));
                    } else {
                        if(a.code = "NotLoginError") {
                            alert("로그인 세션 만료 - " + a.message);
                            Cookies.removeCookie("teamproject_email");
                            document.location = '/#main';
                        } else {
                            alert("내 정보 가져오기 실패 - " + a.message);
                            document.location = '/#login';
                        }
                    }
                }, function(a,b,c) {
                    // 내 정보 가져오기 실패.
                    alert("내정보 가져오기 실패.");
                    document.location = '/#login';
                });
            },
            viewDidAppear: function() {
                // PC,Tablet,Mobile

                // PC,Tablet

                // Mobile
                this.loadData();
            },

            /*
             * 이 메서드는 pageTransition.js을 이용해서 사용할 경우에만 사용 가능하다.(*중요)
             */
            viewDidDisappear: function() {
            }

        });

        return new MyInfoView;
    });


