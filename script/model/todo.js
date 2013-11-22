/**
 * Created with IntelliJ IDEA.
 * User: hjshin
 * Date: 2013. 10. 31.
 * Time: 오후 3:00
 * To change this template use File | Settings | File Templates.
 */
define( [ 'jquery', 'backbone'],
    function( $, Backbone) {

        return  Backbone.Model.extend( {
            urlRoot:"/api/todo",

            reqdata:function() {
                this.set('ts', new Date().getTime());
                return this;
            },

            initialize: function() {
            },

            add: function(success, error) {
                //post data :  [title], [parent],[start_date], [end_date]
                $.ajax(this.urlRoot, {
                    type:'POST',
                    data: this.reqdata().toJSON(),
                    success: function(a,b,c) { success(a,b,c); },
                    error: function(a,b,c) { error(a,b,c); }
                });
            },

            getMain: function(success, error) {
                //get
                $.ajax(this.urlRoot, {
                    type:'GET',
                    success: function(a,b,c) { success(a,b,c); },
                    error: function(a,b,c) { error(a,b,c); }
                });
            },

            getList: function(todoid, depth, success, error) {
                // get
                $.ajax(this.urlRoot + "/" + todoid + "/" + depth, {
                    type:'GET',
                    success: function(a,b,c) { success(a,b,c); },
                    error: function(a,b,c) { error(a,b,c); }
                });
            },

            editTodo: function (todoid, success, error) {
                // put data : [title], [start_date], [end_date], [parent], [done], [users] = +user_seq,-user_seq
                $.ajax(this.urlRoot + "/" + todoid, {
                    type:'PUT',
                    data: this.reqdata().toJSON(),
                    success: function(a,b,c) { success(a,b,c); },
                    error: function(a,b,c) { error(a,b,c); }
                });
            },

            deleteTodo: function(todoid, success, error) {
                // delete
                $.ajax(this.urlRoot + "/" + todoid, {
                    type:'DELETE',
                    success: function(a,b,c) { success(a,b,c); },
                    error: function(a,b,c) { error(a,b,c); }
                });
            },

            getTodoUserList: function(todoid, success, error) {
                // get
                $.ajax(this.urlRoot + "/" + todoid + "/users", {
                    type:'GET',
                    success: function(a,b,c) { success(a,b,c); },
                    error: function(a,b,c) { error(a,b,c); }
                });
            },

            getTodoCommentList: function(todoid, success, error) {
                // get
                $.ajax(this.urlRoot + "/" + todoid + "/comment", {
                    type:'GET',
                    success: function(a,b,c) { success(a,b,c); },
                    error: function(a,b,c) { error(a,b,c); }
                });
            },

            addTodoComment: function(todoid, success, error) {
                //post data : [text]
                $.ajax(this.urlRoot + "/" + todoid + "/comment", {
                    type:'POST',
                    data: this.reqdata().toJSON(),
                    success: function(a,b,c) { success(a,b,c); },
                    error: function(a,b,c) { error(a,b,c); }
                });
            },

            deleteTodoComment: function(todoid, commentid, success, error) {
                // delete
                $.ajax(this.urlRoot + "/" + todoid + "/comment/" + commentid, {
                    type:'DELETE',
                    success: function(a,b,c) { success(a,b,c); },
                    error: function(a,b,c) { error(a,b,c); }
                });
            },

            searchUser: function(search_word, success, error) {
                // search
                $.ajax("/api/search/user/" + search_word, {
                    type:'SEARCH',
                    success: function(a,b,c) { success(a,b,c); },
                    error: function(a,b,c) { error(a,b,c); }
                });
            }
        } );
    } );


