/**
 * Created with IntelliJ IDEA.
 * User: hjshin
 * Date: 2013. 11. 5.
 * Time: 오후 2:32
 * To change this template use File | Settings | File Templates.
 */
define(function(require) {
    var $ = require("jquery");
    var Backbone = require("backbone");
    var ViewBasic = require("viewbasic");
    var DetailView = require("detailview");
//    var Transition = require("transition");
    var template = require("template!/template/basicLayout");

    var BasicLayout = Backbone.View.extend({
        el:'body',
        device_type : "pc",
        left_view : '',
        center_view : '',
        right_view : '',
        mode:'',
        todoid:'',
        initialize: function(options) {
            this.device_type = ViewBasic.initialize();

//            if(this.device_type == "mobile") {
//                document.location = "m/main";
//            } else {
                this.mode = options.mode;
                this.todoid = options.todoid;
                if(this.mode != "empty") {
                    this.left_view = require('myinfoview');
                    if(this.mode == "main") {
                        this.center_view = require('mainview');
                        this.center_view.on("click_todo", this.openTodoDetail, this);
                    } else {
                        this.center_view = new DetailView({todoid:this.todoid});
                        this.center_view.on('close_detail', this.closeTodoDetail, this);
                    }
                }
//            }
        },

        /*
         * 대쉬 보드에서 발생하는 이벤트 정의
         */
        events: {

        },
        openTodoDetail:function(todo) {
            document.location = "/#detail/" + todo.model._id;
        },

        closeTodoDetail: function() {
            document.location = "/#main";
        },

        render: function() {
            $(this.el).html(template());
            if(this.mode != "empty") {
               this.$el.find(".left-panel").html( this.left_view.render().el);
               this.left_view.viewDidAppear();
               this.$el.find(".center-panel").html( this.center_view.render().el);
               this.center_view.viewDidAppear();
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

    return BasicLayout;
});


