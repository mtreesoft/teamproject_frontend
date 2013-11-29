/**
 * Created with IntelliJ IDEA.
 * User: hjshin
 * Date: 2013. 11. 11.
 * Time: 오후 11:21
 * To change this template use File | Settings | File Templates.
 */
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
        'model/todo',
        'template!/template/detail/blankcommentitem',
        'style!/style/detail/blankcommentitem'  ,
        'bootstrap'
    ], function(
        $,
        _,
        Backbone,
        MD5,
        ViewBasic,
        Todo,
        template
        ){
        var BlankCommentItem = Backbone.View.extend({
            tagName: "a",
            className: "list-group-item blankcommentitem",
            device_type : "pc",
            bEditMode:false,
            todoid:"",
            initialize: function(options) {
                this.device_type = ViewBasic.initialize();
                this.todoid = options.todoid;
            },
            /*
             * 대쉬 보드에서 발생하는 이벤트 정의
             */
            events: {
                'click button#addcommentbtn': 'addCommentItemClick',
                'click button#savecommentbtn': 'saveCommentItemClick',
                'click button#cancelcommentbtn': 'cancelCommentItemClick'
            },

            /*
             * 아래 메서드들은 각 이벤트가 호출되었을 시 처리할 메서드들 위 event에서 정의된 이벤트가 발생시 호출된다
             */
            addCommentItemClick: function(e) {
                e.stopPropagation();

                this.bEditMode = true;
                this.render();
            },
            saveCommentItemClick:function(e) {
                e.stopPropagation();

                var __this = this;
                var todo = new Todo({text:$(this.el).find("#addCommentText").val()});

                todo.addTodoComment(this.todoid, function(a,b,c){
                    if(a.code == "ok" ) {
                        __this.trigger("click_add_comment", this);
                    } else {
                        // ;
                    }

                }, function(a,b,c){
                    // ;
                });
            },
            cancelCommentItemClick: function(e) {
                e.stopPropagation();

                this.bEditMode = false;
                this.render();
            },
            dateformat: function(date) {
                var formatted_date = "";
                formatted_date += date.getFullYear() + ".";
                formatted_date += date.getMonth() + ".";
                formatted_date += date.getDate() + " ";
                formatted_date += date.getHours() + ":";
                formatted_date += date.getMinutes() + ":";
                formatted_date += date.getSeconds() + ".";
                formatted_date += date.getMilliseconds();
                return formatted_date;
            },
            render: function() {

                $(this.el).html(template());

                if(this.bEditMode) {
                    $(this.el).find('.edit_mode').addClass('show-edit-mode');
                    $(this.el).find('.edit_mode').removeClass('hide-edit-mode');
                    $(this.el).find('.blank_mode').addClass('hide-blank-mode');
                    $(this.el).find('.blank_mode').removeClass('show-blank-mode');
                } else {
                    $(this.el).find('.edit_mode').addClass('hide-edit-mode');
                    $(this.el).find('.edit_mode').removeClass('show-edit-mode');
                    $(this.el).find('.blank_mode').addClass('show-blank-mode');
                    $(this.el).find('.blank_mode').removeClass('hide-blank-mode');
                }

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

        return BlankCommentItem;
    });





