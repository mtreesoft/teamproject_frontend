/**
 * Created with IntelliJ IDEA.
 * User: hjshin
 * Date: 2013. 11. 12.
 * Time: 오전 12:41
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
        'template!/template/detail/blanktodoitem',
        'style!/style/detail/blanktodoitem',
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
        var BlankTodoItem = Backbone.View.extend({
            tagName: "div",
            className: "blanktodoitem",
            device_type : "pc",
            bEditMode:false,
            parentid:'',
            depth:'',

            initialize: function(options) {
                this.device_type = ViewBasic.initialize();
                this.parentid = options.parentid;
                this.depth = options.depth;
                $(this.el).addClass("C" + this.parentid);
            },
            /*
             * 대쉬 보드에서 발생하는 이벤트 정의
             */
            events: {
                'keyup textarea#addtodota':'textarea_keyup',
                'click button#addtodobtn': 'addTodoItemClick',
                'click button#savetodobtn': 'saveTodoItemClick',
                'click button#canceltodobtn': 'cancelTodoItemClick'
            },

            /*
             * 아래 메서드들은 각 이벤트가 호출되었을 시 처리할 메서드들 위 event에서 정의된 이벤트가 발생시 호출된다
             */
            textarea_keyup: function(e) {

                e.target.style.height = "1px";
                e.target.style.height = e.target.scrollHeight + "px";
            },
            addTodoItemClick: function(e) {
                e.stopPropagation();

                this.bEditMode = true;
                this.render();
            },
            saveTodoItemClick:function(e) {
                e.stopPropagation();

                var __this = this;
                var todo = new Todo({
                    parent:this.parentid,
                    title: $(this.el).find("#addtodota").val(),
                    start_date: new Date(),
                    end_date: new Date()
                });

                todo.add(function(a, b, c){
                    if(a.code == "ok") {
                        $("#addtodota").val("");
                        __this.recvid = a.message[0];
                        __this.trigger("click_add_todo", __this);

                    } else {
                        alert("todo 추가 오류 => " + a.message[0].msg);
                    }
                }, function(a, b, c){
                    alert("todo 추가 오류.(통신오류)=>" + a);
                });

            },
            cancelTodoItemClick: function(e) {
                e.stopPropagation();
                this.bEditMode = false;
                this.render();
            },
            dateformat: function(date) {
                var formatted_date = "";
                formatted_date += date.getFullYear() + ".";
                formatted_date += (date.getMonth()+1) + ".";
                formatted_date += date.getDate() ;
                return formatted_date;
            },
            showDepthBar: function() {
                var parentSize = this.depth+1;
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
            render: function() {

                $(this.el).html(template());

                if(this.depth == 4) {
                    $(this.el).find('.edit_mode').addClass('hide-edit-mode');
                    $(this.el).find('.edit_mode').removeClass('show-edit-mode');
                    $(this.el).find('.blank_mode').addClass('hide-blank-mode');
                    $(this.el).find('.blank_mode').removeClass('show-blank-mode');
                    $(this.el).find('.end-depth').addClass('show-blank-mode');
                    $(this.el).find('.end-depth').removeClass('hide-blank-mode');
                } else  {
                    $(this.el).find('.end-depth').addClass('hide-blank-mode');
                    $(this.el).find('.end-depth').removeClass('show-blank-mode');
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

                    // $(this.el).find('#depthTextID').text((this.options.depth + 1) + " depth todo 추가하기");
                }
                this.showDepthBar();
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

        return BlankTodoItem;
    });
