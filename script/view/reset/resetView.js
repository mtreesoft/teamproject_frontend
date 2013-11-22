/**
 * Created with IntelliJ IDEA.
 * User: hjshin
 * Date: 2013. 10. 29.
 * Time: 오후 6:26
 * To change this template use File | Settings | File Templates.
 */
define(
    [
        'jquery',
        'backbone',
        'viewbasic',
        'model/user',
        'template!/template/reset/reset',
        'style!/style/common',
        'style!/style/reset/reset' ,
        'bootstrap'
    ], function(
        $,
        Backbone,
        ViewBasic,
        User,
        template
        ){
        var ResetView = Backbone.View.extend({
            el : '.center-panel',
            device_type : "pc",
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
                'click a#divResetPW_btnReset': 'resetClick',
                'click a#divResetPW_btnCancel': 'cancelClick',
                'click button#btnRefreshMotion': 'drawMotionCaptchaRefresh'
            },

            /*
             * 아래 메서드들은 각 이벤트가 호출되었을 시 처리할 메서드들 위 event에서 정의된 이벤트가 발생시 호출된다
             */
            // PC,Tablet,Mobile

            // PC,Tablet

            // Mobile
            resetClick: function(e) {
                if($('#resetEmailID').val().length == 0) {
                    alert("이메일 ID를 입력해 주세요.");
                    return;
                }

                if(this.motionCheck == false) {
                    alert("스팸방지용 모션을 확인해 주세요.");
                    return;
                }

                new User( {
                    id : $('#resetEmailID').val()
                }).reset_pw(function(a,b,c) {
                        // 가입성공.
                        if(a.code == "ok") {
                            alert("비밀번호가 초기화 되었습니다. 메일을 확인해 주세요.");
                            document.location = "/#main";
                        } else {
                            alert("비밀번호 초기화 오류(메일을 확인해주세요.) - " + a.message);
                        }
                    }, function(a,b,c) {
                        // 가입실패.
                        alert("비밀번호 초기화가 실패하였습니다.");
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
                // MotionCaptcha 초기화
                this.drawMotionCaptchaRefresh();
            },

            /*
             * 이 메서드는 pageTransition.js을 이용해서 사용할 경우에만 사용 가능하다.(*중요)
             */
            viewDidDisappear: function() {
            }

        });

        return new ResetView;
    });

