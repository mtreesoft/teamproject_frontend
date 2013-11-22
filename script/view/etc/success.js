/**
 * Created with IntelliJ IDEA.
 * User: hjshin
 * Date: 2013. 11. 21.
 * Time: 오전 11:36
 * To change this template use File | Settings | File Templates.
 */
define(
    [
        'jquery',
        'backbone',
        'template!/template/etc/success',
        'style!/style/etc/success',
        'bootstrap'
    ], function(
        $,
        Backbone,
        template
        ){
        var SuccessView = Backbone.View.extend({
            initialize: function() {
            },

            /*
             * 대쉬 보드에서 발생하는 이벤트 정의
             */
            events: {
            },

            /*
             * 아래 메서드들은 각 이벤트가 호출되었을 시 처리할 메서드들 위 event에서 정의된 이벤트가 발생시 호출된다
             */
            render: function() {
                $(this.el).html(template());
                $(this.el).find('a#login').click(this.locateLogin);
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
            },

            locateLogin: function(e) {
                document.location = "/#login";
            }

        });

        return new SuccessView;
    });
