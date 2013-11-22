/**
 * Created with IntelliJ IDEA.
 * User: hjshin
 * Date: 2013. 10. 29.
 * Time: 오후 4:43
 * To change this template use File | Settings | File Templates.
 */
define(
    [
        'jquery',
        'underscore',
        'backbone',
        'todoitem',
        'viewbasic',
        'model/todo',
        'template!/template/main/main',
        'style!/style/main/main',
        'bootstrap'
//        'sortable'
    ], function(
        $,
        _,
        Backbone,
        TodoItem,
        ViewBasic,
        Todo,
        template
        ){


    var MainView = Backbone.View.extend({
        device_type : "pc",
        tagName:"div",
        className:"main",
        doneShowState:true,
        initialize: function() {
            this.device_type = ViewBasic.initialize();

        },

        /*
         * 대쉬 보드에서 발생하는 이벤트 정의
         */
        events: {
            'click button#addtodobtn': 'addTodo',
            'keyup textarea#addtodota':'textarea_keyup',
            'click button#doneCheckBtn':'todoDoneList'

        },

        /*
         * 아래 메서드들은 각 이벤트가 호출되었을 시 처리할 메서드들 위 event에서 정의된 이벤트가 발생시 호출된다
         */
        textarea_keyup: function(e) {
            e.target.style.height = "1px";
            e.target.style.height = e.target.scrollHeight + "px";
        },
        todoClick:function(todo) {
          this.trigger("click_todo", todo);
        },
        todoDoneList: function() {
            this.doneShowState = !this.doneShowState;
            if(this.doneShowState) {
                $('#doneCheckBtn').text("완료 가리기");
            } else {
                $('#doneCheckBtn').text("완료 보기");
            }
            this.refreshAllList();
        },
        todoDeleteClick: function(todo) {
            var __this = this;
            var __todo = new Todo();

            __todo.deleteTodo(todo.model._id, function(a,b,c) {
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
        addTodo: function(e) {
            var __this = this;
            var todo = new Todo({
                title: $(this.el).find("#addtodota").val(),
                start_date: new Date(),
                end_date: new Date()
            });

            todo.add(function(a, b, c){
                if(a.code == "ok") {
                    $(__this.el).find("#addtodota").val("");
                    __this.refreshAllList();
                } else {
                    alert("todo 추가 오류 => " + a.message[0].msg);
                }
            }, function(a, b, c){
                alert("todo 추가 오류.(통신오류)=>" + a);
            });
        },
        loadTodoList:function(__this, itemlist) {
            $(__this.el).find('.todolist').empty();
            if(_.size(itemlist) == 0) {
                $(__this.el).find('.todolist').append("진행 중인 Todo가 없습니다!!!");
            } else {
                var __countDone = 0;
                var __countDoing = 0;
                _.each(itemlist, function(todoitem) {
                    var bShow = __this.doneShowState;
                    if(bShow == false) {
                        bShow = !todoitem.done;
                    }
                    if(bShow){
                        todoitem.parents = todoitem.path.split('#');
                        var todoObj = new TodoItem({model:todoitem});
                        $(__this.el).find('.todolist').append(todoObj.render().el);
                        todoObj.on('click_todo', __this.todoClick, __this);
                        todoObj.on('click_todo_delete', __this.todoDeleteClick, __this);
                    }

                    if(todoitem.done) {
                        __countDone += 1;
                    } else {
                        __countDoing += 1;
                    }
                    $(__this.el).find('#todoCount').text("(진행중:" + __countDoing + ", 완료:" + __countDone +  ")");
                });
            }

        },
        render: function() {
            $(this.el).empty();
            $(this.el).html(template());
            this.delegateEvents();
            return this;
        },
        /*
         * 이 메서드는 pageTransition.js을 이용해서 사용할 경우에만 사용 가능하다.(*중요)
         */
        refreshAllList: function() {
            var __this = this;
            var todo = new Todo();
            todo.getMain(function(a, b, c){
                __this.loadTodoList(__this, a.message);
            }, function(a, b, c){
                ;
            });
        },
        viewDidAppear: function() {
            this.refreshAllList();
//            $('.sortable').sortable();
        },

        /*
         * 이 메서드는 pageTransition.js을 이용해서 사용할 경우에만 사용 가능하다.(*중요)
         */
        viewDidDisappear: function() {
        }

    });

    return new MainView;
});

