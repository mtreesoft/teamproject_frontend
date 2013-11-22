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
        'template!/template/join/join',
        'style!/style/common',
        'style!/style/join/join' ,
        'bootstrap'
    ], function(
        $,
        Backbone,
        ViewBasic,
        User,
        template
        ){
        var JoinView = Backbone.View.extend({
            el : '.center-panel',
            device_type : "pc",
            emailCheck : false,
            motionCheck : false,

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
                'click button#btnCheckEmail': 'emailCheckClick',
                'click div#joinViewJoinBtn': 'joinClick',
                'click div#joinViewCancelBtn': 'cancelClick',
                'click button#btnRefreshMotion': 'drawMotionCaptchaRefresh'
            },

            /*
             * 아래 메서드들은 각 이벤트가 호출되었을 시 처리할 메서드들 위 event에서 정의된 이벤트가 발생시 호출된다
             */
            // PC,Tablet,Mobile

            // PC,Tablet

            // Mobile
            emailCheckClick: function(e) {
                var __this = this;
                new User( {
                    id : $('#joinID').val()
                }).check_id(function(a,b,c) {
                    // 가입성공.
                    if(a.code == "ok") {
                        if(a.message[0].result == true) {
                            __this.emailCheck = true;
                            alert("사용가능합니다.");
                        } else {
                            alert("중복된 이메일이 등록되어 있습니다.");
                        }
                    } else {
                        alert("사용 불가능합니다." + a.message);
                    }
                }, function(a,b,c) {
                    // 가입실패.
                    alert("사용 확인이 실패하였습니다.");
                });
            },
            joinClick: function(e) {

                if(this.emailCheck == false) {
                    alert("사용가능한 이메일 주소인지 확인해 주세요.");
                    return;
                }

                if($('#joinPW').val() != $('#joinPWConfirm').val()) {
                    alert("비밀번호를 확인해 주세요.");
                    return;
                }

                if($('#joinPW').val().length < 6) {
                    alert("비밀번호는 6글자 이상입니다.");
                    return;
                }

                if(this.motionCheck == false) {
                    alert("스팸방지용 모션을 확인해 주세요.");
                    return;
                }





                new User( {
                    id : $('#joinID').val(),
                    pw : $('#joinPW').val()
                }).join(function(a,b,c) {
                        // 가입성공.
                        if(a.code == "ok") {
                            alert("회원 가입 되었습니다.");
                            document.location = "/#login";
                        } else {
                            alert("회원 가입 실패 - " + a.message);
                        }

                    }, function(a,b,c) {
                        // 가입실패.
                        alert("회원 가입 실패.");
                    });
            },
            cancelClick: function(e) {
                document.location = "/#login";
            },



            drawMotionCaptchaRefresh: function () {
                var __this = this;
                this.motionCheck = false;
                $("#mc-canvas").remove();
                $("<canvas/>", {
                    id:"mc-canvas"
                }).appendTo($("#joinMotionCaptcha")).motioncaptcha({
                        errorMsg: '다시 시도해주세요.',
                        successMsg: '성공',
                        onSuccess: function() {
                            __this.motionCheck = true;
                        }
                    });
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
                // PC,Tablet,Mobile

                // PC,Tablet

                // Mobile
                // MotionCaptcha 초기화
                this.drawMotionCaptchaRefresh();
            },

            /*
             * 이 메서드는 pageTransition.js을 이용해서 사용할 경우에만 사용 가능하다.(*중요)
             */
            viewDidDisappear: function() {
            }

        });

        return new JoinView;
    });
