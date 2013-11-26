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

            showError: function(error) {
                $("#error").text(error).show();
            },

            /*
             * 아래 메서드들은 각 이벤트가 호출되었을 시 처리할 메서드들 위 event에서 정의된 이벤트가 발생시 호출된다
             */
            // PC,Tablet,Mobile
            showItem: function() {
                $('#error').hide();
                $("#editPW").val("");
                $("#editPWConfirm").val("");
                    
                if(this.editmode) {
                    $('div.showmode').hide();
                    $('div.editmode').show();
                    $('div.showmode-btns').hide();
                    $('div.editmode-btns').show();
                } else {
                    $('div.showmode').show();
                    $('div.editmode').hide();
                    $('div.showmode-btns').show();
                    $('div.editmode-btns').hide();
                }
            },
            goEdit:function(e) {
                this.editmode = !this.editmode;
                this.showItem();
            },
            goEditSave:function(e) {

                if(!$("#editPW").val()) {
                    this.showError("비밀번호를 입력해 주세요.");
                    return;
                }

                if ($("#editPW").val() != $("#editPWConfirm").val()) {
                    this.showError("입력된 두 비밀번호를 확인해 주세요.");
                    return;
                }


                var __this = this;
                var editUser = new User({
                    name: $("#editName").val(),
                    pw: $("#editPW").val()
                });
                editUser.edit(function(a, b, c) {
                    if(a.code == "ok") {
                        __this.loadData();
                        __this.goEdit();
                    } else {
                        __this.showError(a.message[0].msg);
                    }
                }, function(a, b, c){
                    __this.showError("오류로 변경이 실패하였습니다. 잠시 후 다시 시도해 주세요.");
                });
            },
            // PC,Tablet

            // Mobile
            goMainClick: function(e) {
                document.location = '/#main';
            },
            logoutClick: function(e) {
                this.user.logout(function(a,b,c) {
                    Cookies.removeCookie("teamproject_email");
                    location.reload();
                }, function(a,b,c) {});

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

                    var myinfo = $('.myinfo .info');
                    
                    // 내정보 가져오기 성공.
                    if(a.code == "ok") {
                        var imgpath = a.message[0].pic + "&s=100";
                        myinfo.find('.profileimg').attr("src", imgpath);
                        if(!a.message[0].name) {
                            myinfo.find('.showmode .name').text("No Name");
                        } else {
                            myinfo.find('.showmode .name').text(a.message[0].name);
                            $('input#editName').val(a.message[0].name);
                        }
                        myinfo.find('.showmode .email').text(a.message[0].user_id);
                        $('#edit_email').text(a.message[0].user_id);
                        myinfo.find('.showmode .regdate').text(__this.dateformat(new Date(a.message[0].reg_date)));
                        $('div#edit_regdate').text(__this.dateformat(new Date(a.message[0].reg_date)));
                    } else {
                        Cookies.removeCookie("teamproject_email");
                        alert("로그인 정보가 잘못되었습니다. 다시 로그인 해 주세요.");
                        document.location = '/#login';
                    }

                }, function(a,b,c) {
                    // 내 정보 가져오기 실패.
                    alert("오류가 발생하여 내 정보를 가져올 수 없었습니다. 잠시 후 다시 시도해 주세요.");
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

        return (new MyInfoView);
    });


