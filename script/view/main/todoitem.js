/**
 * Created with IntelliJ IDEA.
 * User: hjshin
 * Date: 2013. 11. 10.
 * Time: 오후 4:12
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
        'template!/template/main/todoitem',
        'style!/style/main/todoitem',
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
        var TodoItem = Backbone.View.extend({
//            tagName: "li",
            tagName: "a",
            className: "list-group-item todoitem",
            device_type : "pc",
            initialize: function() {
                this.device_type = ViewBasic.initialize();

                // data formatting
                this.model.start_date = this.dateformat(new Date(this.model.start_date));
                this.model.end_date = this.dateformat(new Date(this.model.end_date));
                this.model.create_date = this.dateformat(new Date(this.model.create_date));
                if(typeof(this.model.close_date) != 'undefined') {
                    this.model.close_date = this.dateformat(new Date(this.model.close_date));
                }
            },
            /*
             * 대쉬 보드에서 발생하는 이벤트 정의
             */
            events: {
                'click': 'todoItemClick',
                'click #stateBtn': 'stateBtnClick',
                'click #deleteBtn': 'deleteBtnClick'
            },

            /*
             * 아래 메서드들은 각 이벤트가 호출되었을 시 처리할 메서드들 위 event에서 정의된 이벤트가 발생시 호출된다
             */
            todoItemClick: function(e) {
                this.trigger("click_todo", this);
            },
            deleteBtnClick: function(e) {
                e.stopPropagation();
                this.trigger("click_todo_delete", this);
            },
            stateBtnClick: function(e) {
                e.stopPropagation();
                this.model.done = !this.model.done;
                var __this = this;
                var __todo = new Todo({
                    done: this.model.done
                });

                __todo.editTodo(this.model._id, function(a,b,c) {
                    if(a.code == "ok") {
                        __this.refreshThisTodo();
                    } else {
                        ;
                    }
                }, function (a,b,c) {
                    ;
                });
            },
            refreshThisTodo: function() {
                var __this = this;
                var __todo = new Todo();

                __todo.getList(this.model._id, 0, function(a,b,c) {
                    if(a.code == "ok") {
                        __this.model = a.message[0];
                        __this.model.start_date = __this.dateformat(new Date(__this.model.start_date));
                        __this.model.end_date = __this.dateformat(new Date(__this.model.end_date));
                        __this.model.create_date = __this.dateformat(new Date(__this.model.create_date));
                        if(typeof(__this.model.close_date) != 'undefined') {
                            __this.model.close_date = __this.dateformat(new Date(__this.model.close_date));
                        }
                        __this.render();
                    } else {
                        ;
                    }
                }, function(a,b,c){
                    ;
                });
            },
            dateformat: function(date) {
                var formatted_date = "";
                formatted_date += date.getFullYear() + ".";
                formatted_date += (date.getMonth()+1) + ".";
                formatted_date += date.getDate();

                return formatted_date;
            },
            getParentTitle: function(__this, depth) {
                var todo = new Todo();
                var parents = this.model.path.split("#");
                if(_.size(parents) == 1) {
                   __this.model.roottodotitle = 'ROOT TODO';
                } else {
                    todo.getList(parents[depth], 0, function(a, b, c){
                        if(a.code == "ok") {
                            var title = ""
                            if(depth != 0) {
                                title = " > ";
                            }
                            title +=a.message[0].title;
                            $(__this.el).find(".roottodotitle").append(title);

                            if(depth < (_.size(parents) -2 )) {
                                __this.getParentTitle(__this, depth+1);
                            }
                        }

                    }, function(a, b, c){
                        ;
                    });
                }
            },
            render: function() {
                // root title 읽어오기
                var __this = this;
                this.getParentTitle(this, 0);

                $(this.el).html(template({todo:this.model}));

                if(this.model.done) {
                    $(this.el).find(".todoclosedate").removeClass("hide_item");
                    $(this.el).find(".todoclosedate").addClass("show_item");
                } else {
                    $(this.el).find(".todoclosedate").removeClass("show_item");
                    $(this.el).find(".todoclosedate").addClass("hide_item");
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

        return TodoItem;
    });



