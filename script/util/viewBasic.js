/**
 * Created with IntelliJ IDEA.
 * User: hjshin
 * Date: 2013. 11. 4.
 * Time: 오후 6:01
 * To change this template use File | Settings | File Templates.
 */
define(
    [
        'jquery',
        'mdetect'
    ], function(
        $,
        mdetect
        ){
            var ViewBasic = {

                rotateHelper: function() {
                    if (navigator.userAgent.match("Android")) {
                        var width = navigator.userAgent.match("SHV-E160S") ? 360 : 320
                        var height = 600;

                        // 화면회전시 랜더링을 정상완료하지 못하는 경우가 생기므로 resize 이벤트를 강제적으로 발생
                        var isVertical = true;

                        $("body").css({
                            width: $("body").width() * 2
                        });

                        $("body > .wrapper").css({
                            width: width
                        });

                        $(window).on('orientationchange', orientationChangeHandler);
                        function orientationChangeHandler(e) {
                            switch (window.orientation) {
                                case 0:
                                case 180:
                                    isVertical = true;
                                    break;
                                case -90:
                                case 90:
                                    isVertical = false;
                                    break;

                            }
                            if (!isVertical) {
                                $("body").addClass("width2x");
                            } else {
                                $("body").removeClass("width2x");
                            }
                            $(window).trigger("my_resize", isVertical);
                        }

                        $(window).on("my_resize", function (e, isVertical) {
                            /**
                             * 400(360) * 640(600)
                             * 360(320) * 640(600)
                             *
                             */
                            $("body > .wrapper").css({
                                width:isVertical ? width : height
                            });
                        });
                    }
                },
                mainLayout: function() {


                },
                mobileMainLayout: function() {
                    $('.tp-left-panel').remove();
                    $('.tp-right-panel').remove();

                    $('.tp-wrap').addClass('m-wrap');

                    $('.tp-center-panel').addClass('m-center-panel');

                },
                checkDevice: function() {
                    if(mdetect.DetectMobileQuick()) {
                        return "mobile";
                    } else if(mdetect.DetectTierTablet()) {
                        return "tablet";
                    } else {
                        return "pc";
                    }
                },
                initialize: function() {
                    // 화면 로테이션이 발생하는 경우 다시 그려주기 보완
                    ViewBasic.rotateHelper();
                    // 단말 장치 종류 및 화면 크기에 맞춰 레이아웃 조정.
                    var deviceType = ViewBasic.checkDevice();
                    if(deviceType == "pc" || deviceType == "tablet") {
                        ViewBasic.mainLayout();
                        $( window ).resize(function() {
                            ViewBasic.mainLayout();
                        });
                    } else {
                        ViewBasic.mobileMainLayout();
                    }

                    return deviceType;
                }

            };

            return ViewBasic;
        });