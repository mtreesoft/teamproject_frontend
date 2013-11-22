/**
 * Created with IntelliJ IDEA.
 * User: hjshin
 * Date: 2013. 11. 20.
 * Time: 오후 1:41
 * To change this template use File | Settings | File Templates.
 */
define(
    [
        'jquery',
        'backbone',
        'template!/template/home/home',
        'style!/style/home/home',
        'bootstrap'
    ], function(
        $,
        Backbone,
        template
        ){
        var HomeView = Backbone.View.extend({
            cursection:"",
            initialize: function(options) {
                this.cursection = options.section;
            },

            /*
             * 대쉬 보드에서 발생하는 이벤트 정의
             */
            events: {
                
            },

            /*
             * 아래 메서드들은 각 이벤트가 호출되었을 시 처리할 메서드들 위 event에서 정의된 이벤트가 발생시 호출된다
             */
            moveSection: function(section_id) {
                var section = $(this.el).find('div#' + section_id);
                $('body').stop().animate({scrollTop: section.offset().top},
                    {duration: 800});
            },
            linkClick:function(e) {

                var section_link = $.attr(this,'href');
                
                if (section_link == "#main") {
                    location.href = section_link;
                    return false;    
                }

                var section = $(section_link);
                e.preventDefault();
                $('body').stop().animate({scrollTop: section.offset().top},
                    {duration: 800});
            },
            render: function() {
                $(this.el).html(template());
                this.moveSection(this.cursection);
                return this;
            },
            /*
             * 이 메서드는 pageTransition.js을 이용해서 사용할 경우에만 사용 가능하다.(*중요)
             */
            viewDidAppear: function() {
                $(this.el).find("a[href*=#]").click(this.linkClick);
            },

            /*
             * 이 메서드는 pageTransition.js을 이용해서 사용할 경우에만 사용 가능하다.(*중요)
             */
            viewDidDisappear: function() {
            }

        });

        return HomeView;
    });
