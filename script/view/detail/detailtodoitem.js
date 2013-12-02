/**
 * Created with IntelliJ IDEA.
 * User: hjshin
 * Date: 2013. 11. 12.
 * Time: 오전 12:20
 * To change this template use File | Settings | File Templates.
 */
define(
    [
        'jquery',
        'underscore',
        'backbone',
        'md5',
        'viewbasic',
        'commentitem',
        'blankcommentitem',
        'model/todo',
        'template!/template/detail/detailtodoitem',
        'template!/template/detail/user',
        'template!/template/detail/useraddbtn',
        'template!/template/detail/useradditem',
        'template!/template/detail/useraddblankitem',
        'template!/template/detail/useradderroritem',
        'style!/style/detail/detailtodoitem',
        'style!/style/detail/user',
        'bootstrap'
    ], function(
        $,
        _,
        Backbone,
        MD5,
        ViewBasic,
        CommentItem,
        BlankCommentItem,
        Todo,
        template,
        user_template,
        user_add_btn_template,
        user_add_item_template,
        user_add_blank_item_template,
        user_add_error_item_template
        ){
        var DetailTodoItem = Backbone.View.extend({
            tagName: "div",
            className: "detailtodoitem",
            device_type : "pc",
            subtodoopen: false,
            subtodoarr:[],
            bShowDelBtn:false,
            initialize: function(options) {
                this.device_type = ViewBasic.initialize();
                $(this.el).addClass(this.model._id);
                this.subtodoopen = options.subopen;
            },
            /*
             * 대쉬 보드에서 발생하는 이벤트 정의
             */
            events: {
                'click button#editTodoItemBtn': 'editTodoItemBtnClick',
                'click button#deleteBtn': 'deleteTodoItemBtnClick',
                'click button#stateBtn': 'stateTodoItemBtnClick',
                'click button#openSubBtn': 'openSubTodoItemBtnClick',
                'click button#saveEditBtn': 'saveEditBtnClick',
                'click button#cancelEditBtn': 'cancelEditBtnClick',
                'keyup textarea#edit_title':'textarea_keyup'
            },

            /*
             * 아래 메서드들은 각 이벤트가 호출되었을 시 처리할 메서드들 위 event에서 정의된 이벤트가 발생시 호출된다
             */
            textarea_keyup: function(e) {
                e.target.style.height = "1px";
                e.target.style.height = e.target.scrollHeight + "px";
            },
            editTodoItemBtnClick: function(e) {
                e.stopPropagation();

                // todo 정보 edit에 채우기.
                $(this.el).find('#edit_title').text(this.model.title);

                $(this.el).find('#edit_startdate').val(this.dateformat2(new Date(this.model.start_date)));
                $(this.el).find('#edit_enddate').val(this.dateformat2(new Date(this.model.end_date)));

                $(this.el).find('.todoeditmode').show();
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
                        // ;
                    }
                }, function(a,b,c){
                    // ;
                });
            },
            saveEditBtnClick: function(e) {
                e.stopPropagation();

                var __this = this;
                var __todo = new Todo({title:$(this.el).find('#edit_title').val(),
                    start_date:$(this.el).find('#edit_startdate').val(),
                    end_date:$(this.el).find('#edit_enddate').val()
                });

                __todo.editTodo(this.model._id, function(a,b,c){
                    if(a.code == "ok") {
                        __this.refreshThisTodo();
                    } else {
                        // ;
                    }
                }, function(a,b,c){
                    // ;
                });
            },
            cancelEditBtnClick: function(e) {
                e.stopPropagation();
                $(this.el).find('#edit_title').text("");
                $(this.el).find('#edit_startdate').val("");
                $(this.el).find('#edit_enddate').val("");
                $(this.el).find('.edituserlist').empty();
                $(this.el).find('.todoeditmode').hide();
            },
            deleteTodoItemBtnClick: function(e) {
                e.stopPropagation();
                // 리스트 전체 갱신
                this.trigger("click_delete_todo", this);
            },
            stateTodoItemBtnClick: function(e) {
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
                        // ;
                    }
                }, function (a,b,c) {
                    // ;
                });
            },
            openSubTodoItemBtnClick: function(e) {
                e.stopPropagation();
                // 리스트에 추가 혹은 제거.
                this.subtodoopen = !this.subtodoopen;
                if(this.subtodoopen) {
                    this.trigger("click_open_sub_todo", this);
                } else {
                    this.trigger("click_close_sub_todo", this);
                }
                this.getSubTodoCount();
            },
            dateformat: function(date) {    // 2013.1.1
                var formatted_date = "";
                formatted_date += date.getFullYear() + ".";
                formatted_date += (date.getMonth()+1) + ".";
                formatted_date += date.getDate() ;
                return formatted_date;
            },
            dateformat2: function(date) {   //2013-01-01

                var yyyy = date.getFullYear().toString();
                var mm = (date.getMonth()+1).toString(); // getMonth() is zero-based
                var dd  = date.getDate().toString();

                return yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]);
            },
            loadTodoUser: function(__this) {
                // user 정보 읽어오기.
                var __this = this;
                var __todo = new Todo();

                __todo.getTodoUserList(this.model._id, function(a,b,c) {
                    if(a.code == "ok") {
                        $(__this.el).find('.userlist').empty();
                        for(var i=0; i< _.size(a.message); i++) {
                            $(__this.el).find('.userlist').append(user_template({user:a.message[i]}));
                            if(_.size(a.message) > 1) {
                                var thisuserid = a.message[i]._id;
                                $(__this.el).find('.user-del-btn-' + thisuserid).show();
                                // user 가 1명보다 많은 경우만 삭제할 수 있다.
                                $(__this.el).find('.user-del-btn-' + thisuserid).on('click', function(e) {
                                    var thisClassNameArr = e.currentTarget.className.split(" ");
                                    var thisBtnNameArr = thisClassNameArr[4].split("-");
                                    var thisBtnName = thisBtnNameArr[3];
                                    var __todo = new Todo({users:("-"+thisBtnName)});
                                    __todo.editTodo(__this.model._id, function(a,b,c){
                                        if(a.code == "ok") {
                                            __this.loadTodoUser(__this);
                                        } else {
                                            // ;
                                        }
                                    }, function(a,b,c){
                                        // ;
                                    });
                                });
                            } else {
                                // user 가 1명인 경우 삭제 할 수 없다.
                                $(__this.el).find('.user-del-btn-' + a.message[i]._id).hide();
                            }
                        }

                        // user 추가버튼.
                        $(__this.el).find('.userlist').append(user_add_btn_template());
                        $(__this.el).find('#adduserbtn').on('click', function(e) {
                            __this.addTodoUser(e, __this);
                        });

                        __this.model.user_cnt = _.size(a.message);
                        $(__this.el).find('.user_count').empty();
                        $(__this.el).find('.user_count').text(__this.model.user_cnt);
                    } else {
                        // ;
                    }
                }, function(a,b,c) {
                    // ;
                });
            },
            addTodoUser: function(e, __this) {
                var __this = this;
                e.stopPropagation();

                $('#userAddModal').find('.user-search-btn').on('click', function() {
                    __this.searchUser($(".user-search-word").val());
                });
                $('#userAddModal').find('.add-user-save-close').on('click', function() {
                    __this.addSelectedUser();
                });
                $('#userAddModal').find('.add-user-close').on('click', function() {
                    // 모달 닫히는 경우 모달 안의 버튼에 추가된 이벤트 제거.
                    $('#userAddModal').find('.user-search-btn').off('click');
                    $('#userAddModal').find('.add-user-save-close').off('click');
                });
                // modal 안의 기존 값 삭제
                $(".user-search-word").val("");
                $('.user-search-result-list').empty();

                // modal 열기.
                $('#userAddModal').modal();
            },
            searchUser:function(searchword) {
                $('.user-search-result-list').empty();
                if(searchword.toString().length < 2) {
                    $('.user-search-result-list').append(user_add_error_item_template());
                } else {
                    var __this = this;
                    var __todo = new Todo();

                    __todo.searchUser(searchword, function(a,b,c) {
                        if(a.code == "ok") {
                            if(_.size(a.message) === 0) {
                                $('.user-search-result-list').append(user_add_blank_item_template());
                            } else {
                                for(var i=0; i< _.size(a.message); i++) {
                                    $('.user-search-result-list').append(user_add_item_template({user:a.message[i]}));
                                }
                            }
                        }
                    }, function(a,b,c) {

                    });
                }
            },
            addSelectedUser: function() {
                var selectedUser = "+" + $(':radio[name="user-select"]:checked').attr('class');
                var __this = this;
                var __todo = new Todo({users:selectedUser});

                __todo.editTodo(this.model._id, function(a,b,c){
                    if(a.code == "ok") {
                        __this.loadTodoUser(__this);
                        $('#userAddModal').modal('hide');
                        // 모달 닫히는 경우 모달 안의 버튼에 추가된 이벤트 제거.
                        $('#userAddModal').find('.user-search-btn').off('click');
                        $('#userAddModal').find('.add-user-save-close').off('click');
                    } else {
                        // ;
                    }
                }, function(a,b,c){
                    // ;
                });
            },
            loadTodoComment:function(__this) {
                var __this = this;
                var todo = new Todo();
                $(__this.el).find('.todocommentlist').empty();

                todo.getTodoCommentList(__this.model._id, function(a,b,c){
                    var commentsList = a.message;
                    _.each(commentsList, function(comment) {
                        var commentObj = new CommentItem({model:comment, todoid:__this.model._id});
                        $(__this.el).find('.todocommentlist').append(commentObj.render().el);
                        commentObj.on('click_del_comment', __this.deleteComment, __this);
                    });

                    var blankcommentObj = new BlankCommentItem({todoid:__this.model._id});
                    $(__this.el).find('.todocommentlist').append(blankcommentObj.render().el);
                    blankcommentObj.on('click_add_comment', __this.addComment, __this);

                    __this.model.comment_cnt = _.size(commentsList);
                    $(__this.el).find('.comment_count').empty();
                    $(__this.el).find('.comment_count').text(__this.model.comment_cnt);
                }, function(a,b,c){
                    // ;
                });

            },
            deleteComment: function(comment) {
                var __this = this;
                var todo = new Todo();

                __this.model.comment_cnt = __this.model.comment_cnt -1;
                $(__this.el).find(".comment_cnt").text(__this.model.comment_cnt);

                todo.deleteTodoComment(__this.model._id, comment.model._id, function(a,b,c){
                    if(a.code == "ok") {
                        __this.loadTodoComment(__this);
                    } else {
                        // ;
                    }
                }, function(a,b,c){
                    // ;
                });
            },
            addComment: function(comment) {
                this.model.comment_cnt = this.model.comment_cnt +1;
                $(this.el).find(".comment_cnt").text(this.model.comment_cnt);

                this.loadTodoComment(this);
            },
            showDepthBar: function() {
                var parentSize = _.size(this.model.path.split("#"));
                switch(parentSize) {
                    default:
                    case 1:
                        $(this.el).addClass('depth0');
                        break;
                    case 2:
                        $(this.el).addClass('depth1');
                        break;
                    case 3:
                        $(this.el).addClass('depth2');
                        break;
                    case 4:
                        $(this.el).addClass('depth3');
                        break;
                    case 5:
                        $(this.el).addClass('depth4');
                        break;
                }
            },
            getSubTodoCount: function() {
                var __this = this;
                var todo = new Todo();
                this.subtodoarr.length = 0;

                todo.getList(__this.model._id, 1, function(a, b, c){
                    var subTodoCnt = 0;
                    var subTodoCntText = "";
                    if(a.code == "ok") {
                        subTodoCnt = _.size(a.message);
                        __this.subtodoarr = a.message;
                    } else {
                        // ;
                    }
                    var openSubBtn = $(__this.el).find("#openSubBtn");
                    openSubBtn.empty();
                    if(subTodoCnt > 0) {
                        openSubBtn.show();
                        if(__this.subtodoopen) {
                            subTodoCntText = subTodoCnt + "개 닫기";
                        } else {
                            subTodoCntText = subTodoCnt + "개 열기";
                        }
                        openSubBtn.text(subTodoCntText);
                    } else {
                        openSubBtn.hide();
                    }
                }, function(a, b, c){
                    // ;
                });
            },
            render: function() {
                $(this.el).html(template({todo:this.model}));
                $(this.el).find('.todoeditmode').hide();

                if(this.model.done) {
                    $(this.el).find('#editTodoItemBtn').hide();
                    $(this.el).find(".todoclosedate").show();
                } else {
                    $(this.el).find('#editTodoItemBtn').show();
                    $(this.el).find(".todoclosedate").hide();
                }

                this.showDepthBar();
                this.getSubTodoCount();
                this.loadTodoUser(this);
                this.loadTodoComment(this);
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

        return DetailTodoItem;
    });
