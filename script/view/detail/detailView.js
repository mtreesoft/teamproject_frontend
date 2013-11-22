/**
 * Created with IntelliJ IDEA.
 * User: hjshin
 * Date: 2013. 11. 5.
 * Time: 오후 2:45
 * To change this template use File | Settings | File Templates.
 */
define(
    [
        'jquery',
        'backbone',
        'viewbasic',
        'underscore',
        'commentitem',
        'blankcommentitem',
        'detailtodoitem',
        'blanktodoitem',
        'model/todo',
        'template!/template/detail/detail',
        'style!/style/detail/detail'
    ], function(
        $,
        Backbone,
        ViewBasic,
        _,
        CommentItem,
        BlankCommentItem,
        DetailTodoItem,
        BlankTodoItem,
        Todo,
        template
        ){
        var DetailView = Backbone.View.extend({
            device_type : "pc",
            tagName:"div",
            className:"detailview",
            roottodo:"",
            todoid:"",
            todoObjArr:[],
            initialize: function(options) {
                this.device_type = ViewBasic.initialize();
                this.todoid = options.todoid;
            },

            /*
             * 대쉬 보드에서 발생하는 이벤트 정의
             */
            events: {
                'click button#closedetail':'closeThisView'
            },

            /*
             * 아래 메서드들은 각 이벤트가 호출되었을 시 처리할 메서드들 위 event에서 정의된 이벤트가 발생시 호출된다
             */
            closeThisView:function(e) {
                this.trigger('close_detail');
            },
            deleteComment: function(comment) {
                var comment_id = comment.model._id;
                $(comment.el).remove();
                for (var i in this.roottodo.comments) {
                    if(this.roottodo.comments[i]._id == comment_id) {
                        delete this.roottodo.comments[i];
                        break;
                    }
                }
                this.roottodo.comment_cnt = _.size(this.roottodo.comments);
                this.render();

            },
            addComment: function(comment) {
                this.roottodo.comments.push(comment.model);
                this.roottodo.comment_cnt = _.size(this.roottodo.comments);
                this.render();
            },
            dateformat: function(date) {
                var formatted_date = "";
                formatted_date += date.getFullYear() + ".";
                formatted_date += (date.getMonth()+1) + ".";
                formatted_date += date.getDate();

                return formatted_date;
            },
            addTodo: function(blanktodoitem) {
                document.location ="/#detail/" + blanktodoitem.recvid;
            },
            deleteTodo: function(detailtodoitem) {
                var __this = this;
                var __todo = new Todo();
                this.todoid = this.currentParents[0];

                __todo.deleteTodo(detailtodoitem.model._id, function(a,b,c) {
                    if(a.code == "ok") {
                        alert("todo가 삭제되었습니다");
                        __this.refreshAllList();
                    } else {
                        ;
                    }
                }, function (a,b,c) {
                    ;
                });
            },
            openSubTodo: function(detailtodoitem) {
                if(this.currentRootTodo._id == detailtodoitem.model._id) {
                    // root 에서 여는 경우
                    this.currentParents = this.currentRootTodo.path.split("#");
                    this.loadOneDepth(0);
                } else {
                    // 리스트에서 여는 경우
                    this.openOneDepth(detailtodoitem.model._id, (_.size(detailtodoitem.model.path.split("#")) - 1));
                }
            },
            closeSubTodo: function(detailtodoitem) {
                var __this = this;
                _.each(detailtodoitem.subtodoarr, function(subtodoitem) {
//                    _.each(__this.todoObjArr, function(curtodoitem) {
                    for(var i=0; i< _.size(__this.todoObjArr); i++) {
                        // subtodoitem : detailtodoitem이 갖고 있는 todo data item
                        // curtodoitem : detailview 가 갖고 있는 detailtodoitem
                        if(typeof(__this.todoObjArr[i]) != 'undefined') {
                            if(subtodoitem._id == __this.todoObjArr[i].model._id) {
                                // 화면 리스트에서 지우기.
                                $(__this.el).find('.' + __this.todoObjArr[i].model._id).remove();
                                $(__this.el).find('.C' + __this.todoObjArr[i].model._id).remove();

                                // 하위 리스트 찾아 지우기.
                                __this.closeSubTodo(__this.todoObjArr[i]);

                                // 객체 제거
                                delete __this.todoObjArr[i];
                            }
                        }
                    }
//                    });
                });
            },

            loadProjectRoot:function(__this, rootid) {
                $(__this.el).find('.todoroot .detailtodoitem').remove();
                $(__this.el).find('.todoroot .blanktodoitem').remove();

                var todo = new Todo();
                todo.getList(this.currentParents[0], 0, function(a, b, c){
                    if(a.code == "ok") {
                        __this.currentRootTodo = a.message[0];
                        __this.currentRootTodo.start_date = __this.dateformat(new Date(__this.currentRootTodo.start_date));
                        __this.currentRootTodo.end_date = __this.dateformat(new Date(__this.currentRootTodo.end_date));
                        __this.currentRootTodo.create_date = __this.dateformat(new Date(__this.currentRootTodo.create_date));
                        if(typeof(__this.currentRootTodo.close_date) != 'undefined') {
                            __this.currentRootTodo.close_date = __this.dateformat(new Date(__this.currentRootTodo.close_date));
                        }

                        var willSubOpen = false;
                        if(_.size(__this.currentParents) > 0) {
                            willSubOpen = true;
                        }

                        var detailTodoObj = new DetailTodoItem({model:__this.currentRootTodo, subopen:willSubOpen});
                        detailTodoObj.on('click_delete_todo', __this.deleteTodo, __this);
                        detailTodoObj.on('click_open_sub_todo', __this.openSubTodo, __this);
                        detailTodoObj.on('click_close_sub_todo', __this.closeSubTodo, __this);
                        $(__this.el).find('.todoroot').append(detailTodoObj.render().el);

                        __this.todoObjArr.push(detailTodoObj);

                        var blankTodoObj = new BlankTodoItem({parentid:__this.currentParents[0],
                            depth:0});
                        $(__this.el).find('.todoroot').append(blankTodoObj.render().el);
                        blankTodoObj.on('click_add_todo', __this.addTodo, __this);
                    }
                }, function(a, b, c){
                    ;
                });

            },
            openOneDepth: function(parentid, parentdepth) {
                var __this = this;
                var todo = new Todo();

                // 한 레벨의 todo 읽어오기.
                todo.getList(parentid, 1, function(a, b, c){
                    if(a.code == "ok") {

                        for(var j=0; j< _.size(a.message); j++) {
                            var todo = a.message[j];
                            todo.start_date = __this.dateformat(new Date(todo.start_date));
                            todo.end_date = __this.dateformat(new Date(todo.end_date));
                            todo.create_date = __this.dateformat(new Date(todo.create_date));
                            if(typeof(todo.close_date) != 'undefined') {
                                todo.close_date = __this.dateformat(new Date(todo.close_date));
                            }

                            var willSubOpen = false;

                            var detailTodoObj = new DetailTodoItem({model:todo, subopen:willSubOpen});
                            detailTodoObj.on('click_delete_todo', __this.deleteTodo, __this);
                            detailTodoObj.on('click_open_sub_todo', __this.openSubTodo, __this);
                            detailTodoObj.on('click_close_sub_todo', __this.closeSubTodo, __this);
                            $(__this.el).find('.C' + parentid).after(detailTodoObj.render().el);

                            __this.todoObjArr.push(detailTodoObj);

                            var blankTodoObj = new BlankTodoItem({parentid:todo._id, depth:(parentdepth+1)});
                            $(__this.el).find('.' + todo._id).after(blankTodoObj.render().el);
                            blankTodoObj.on('click_add_todo', __this.addTodo, __this);

                        }
                    }
                }, function(a, b, c){
                    ;
                });
            },

            loadOneDepth: function(i) {
                var __this = this;
                var todo = new Todo();

                // 한 레벨의 todo 읽어오기.
                todo.getList(this.currentParents[i], 1, function(a, b, c){
                    if(a.code == "ok") {
                        if(_.size(a.message) == 0) {
                            if(i==0) {
                                // root todo 아래 sub todo가 없는 경우이다.
                                $(__this.el).find('.todolist').empty();
                                $(__this.el).find('.todolist').append("하위 Todo가 없습니다.");
                            }
                        } else {
                            for(var j=0; j< _.size(a.message); j++) {
                                var todo = a.message[j];
                                todo.start_date = __this.dateformat(new Date(todo.start_date));
                                todo.end_date = __this.dateformat(new Date(todo.end_date));
                                todo.create_date = __this.dateformat(new Date(todo.create_date));
                                if(typeof(todo.close_date) != 'undefined') {
                                    todo.close_date = __this.dateformat(new Date(todo.close_date));
                                }

                                var willSubOpen = false;
                                if(i < (_.size(__this.currentParents) - 1) &&
                                    todo._id == __this.currentParents[i+1]) {
                                    willSubOpen = true;
                                }

                                if(i>0) {
                                    // 2 depth 부터는 parent 다음에 끼워 넣는다.
                                    var detailTodoObj = new DetailTodoItem({model:todo, subopen:willSubOpen});
                                    detailTodoObj.on('click_delete_todo', __this.deleteTodo, __this);
                                    detailTodoObj.on('click_open_sub_todo', __this.openSubTodo, __this);
                                    detailTodoObj.on('click_close_sub_todo', __this.closeSubTodo, __this);
                                    $(__this.el).find('.C' + __this.currentParents[i]).after(detailTodoObj.render().el);
                                } else {
                                    // 1 depth 는 차례대로 넣는다.
                                    var detailTodoObj = new DetailTodoItem({model:todo, subopen:willSubOpen});
                                    detailTodoObj.on('click_delete_todo', __this.deleteTodo, __this);
                                    detailTodoObj.on('click_open_sub_todo', __this.openSubTodo, __this);
                                    detailTodoObj.on('click_close_sub_todo', __this.closeSubTodo, __this);
                                    $(__this.el).find('.todolist').append(detailTodoObj.render().el);
                                }

                                __this.todoObjArr.push(detailTodoObj);

                                var blankTodoObj = new BlankTodoItem({parentid:todo._id,
                                    depth:(i+1)});
                                $(__this.el).find('.' + todo._id).after(blankTodoObj.render().el);
                                blankTodoObj.on('click_add_todo', __this.addTodo, __this);

                            }
                            if(_.size(__this.currentParents) > (i+1)) {
                                __this.loadOneDepth(i+1);
                            }
                        }
                    }
                }, function(a, b, c){
                    ;
                });
            },
            loadProjectTodoList: function(__this) {
                $(__this.el).find('.todolist').empty();
                __this.loadOneDepth(0);
            },
            render: function() {
                $(this.el).html(template());
                return this;
            },

            /*
             * 이 메서드는 pageTransition.js을 이용해서 사용할 경우에만 사용 가능하다.(*중요)
             */
            refreshAllList: function() {
                this.todoObjArr.length = 0;
                var __this = this;
                var todo = new Todo();
                todo.getList(this.todoid, -1, function(a, b, c){
                    if(a.code == "ok") {
                        __this.currentTodo = a.message[0];
                        __this.currentTodo.start_date = __this.dateformat(new Date(__this.currentTodo.start_date));
                        __this.currentTodo.end_date = __this.dateformat(new Date(__this.currentTodo.end_date));
                        __this.currentTodo.create_date = __this.dateformat(new Date(__this.currentTodo.create_date));
                        if(typeof(__this.currentTodo.close_date) != 'undefined') {
                            __this.currentTodo.close_date = __this.dateformat(new Date(__this.currentTodo.close_date));
                        }
                        __this.currentParents = __this.currentTodo.path.split("#");
                        var rootid = __this.currentParents[0];
                        __this.loadProjectRoot(__this);
                        __this.loadProjectTodoList(__this);
                    }
                }, function(a, b, c){
                    ;
                });
            },
            viewDidAppear: function() {
                this.refreshAllList();
            },

            /*
             * 이 메서드는 pageTransition.js을 이용해서 사용할 경우에만 사용 가능하다.(*중요)
             */
            viewDidDisappear: function() {
            }

        });

        return DetailView;
    });

