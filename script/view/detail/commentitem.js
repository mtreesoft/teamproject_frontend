/**
 * Created with IntelliJ IDEA.
 * User: hjshin
 * Date: 2013. 11. 11.
 * Time: 오후 9:49
 * To change this template use File | Settings | File Templates.
 */
define(
    [
        'jquery',
        'underscore',
        'backbone',
        'md5',
        'viewbasic',
        'template!/template/detail/commentitem',
        'style!/style/detail/commentitem',
        'bootstrap'
    ], function(
        $,
        _,
        Backbone,
        MD5,
        ViewBasic,
        template
        ){
        var CommentItem = Backbone.View.extend({
            tagName: "a",
            className: "list-group-item commentitem",
            device_type : "pc",
            initialize: function() {
                this.device_type = ViewBasic.initialize();
//                _.each(this.model.users, function(user) {
//                    user.hash = $.md5(user.email);
//                });
            },
            /*
             * 대쉬 보드에서 발생하는 이벤트 정의
             */
            events: {
                'click': 'commentItemClick',
                'click button#delcommentbtn': 'commentDelBtnClick'
            },

            /*
             * 아래 메서드들은 각 이벤트가 호출되었을 시 처리할 메서드들 위 event에서 정의된 이벤트가 발생시 호출된다
             */
            bShowDelBtn:false,
            commentItemClick: function(e) {
                if(this.bShowDelBtn) {
                    $(this.el).find('.comment_delete').removeClass('show-delete-btn');
                    $(this.el).find('.comment_delete').addClass('hide-delete-btn');
                } else {
                    $(this.el).find('.comment_delete').removeClass('hide-delete-btn');
                    $(this.el).find('.comment_delete').addClass('show-delete-btn');
                }
                this.bShowDelBtn = !this.bShowDelBtn;

                //this.trigger("click_todo", this);
            },
            commentDelBtnClick: function(e) {
                e.stopPropagation();
                this.trigger("click_del_comment", this);
            },
            dateformat: function(date) {
                var formatted_date = "";
                var yyyy = date.getFullYear().toString();
                var mm = (date.getMonth()+1).toString();
                var dd = date.getDate().toString();
                var hh = date.getHours().toString();
                var mm2 = date.getMinutes().toString();
                var ss = date.getSeconds().toString();

                formatted_date = yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]) + " ";
                formatted_date += hh + ":" + (mm2[1]?mm2:"0"+mm2[0]) + ":" + (ss[1]?ss:"0"+ss[0]);
                return formatted_date;
            },
            render: function() {
                // data formatting
                this.model.date = this.dateformat(new Date(this.model.date));

                $(this.el).html(template({comment:this.model}));

                $(this.el).find('.comment_delete').addClass('hide-delete-btn');
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

        return CommentItem;
    });




