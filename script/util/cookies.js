/**
 * Created with IntelliJ IDEA.
 * User: hjshin
 * Date: 2013. 11. 18.
 * Time: 오전 10:57
 * To change this template use File | Settings | File Templates.
 */
define( function() {


    var Cookies = {
        // 쿠키세팅
        setCookie: function (key, value) {
            if(navigator.cookieEnabled) {
                var cookieExpireDate = new Date();
                cookieExpireDate.setMonth(cookieExpireDate.getMonth() + 1);
                document.cookie = key + "=" + value + "; expires=" + cookieExpireDate.toGMTString() + "; path=/";
            }
        },

        setCookieDuraion : function (key, value, days) {
            if(navigator.cookieEnabled) {
                var cookieExpireDate = new Date();
                cookieExpireDate.setDate(cookieExpireDate.getDate() + days);
                document.cookie = key + "=" + value + "; expires=" + cookieExpireDate.toGMTString() + "; path=/";
            }
        },

        // 쿠키읽기
        getCookie: function (key) {
            if(navigator.cookieEnabled) {
                var cookie = document.cookie;
                var first = cookie.indexOf(key+"=");
                if(first >= 0) {
                    var str = cookie.substring(first, cookie.length);
                    var last = str.indexOf(";");

                    if(last < 0) {
                        last = str.length;
                    }

                    str = str.substring(0, last).split("=");
                    return str[1];
                } else {
                    return null;
                }
            }
        },
        
        // 쿠기삭제
        removeCookie: function (key) {
            if(navigator.cookieEnabled) {
                var cookieExpireDate = new Date(2000,1,1,1,00);
                document.cookie = key + "=; expires=" + cookieExpireDate.toGMTString() + "; path=/";
            }
        }
    };

    return Cookies;
});
