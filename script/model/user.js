/**
 * Created with IntelliJ IDEA.
 * User: hjshin
 * Date: 2013. 10. 30.
 * Time: 오후 2:29
 * To change this template use File | Settings | File Templates.
 */
define( [ 'jquery', 'backbone'],
    function( $, Backbone) {

    return  Backbone.Model.extend( {
        urlRoot:"/api/auth",

        reqdata:function() {
            this.set('ts', new Date().getTime());
            return this;
        },

        initialize: function() {
        },

        login: function(success, error) {
            $.ajax(this.urlRoot + '/login', {
                type:'POST',
                data: this.reqdata().toJSON(),
                success: function(a,b,c) {

                    success(a,b,c);
                },
                error: function(a,b,c) { error(a,b,c); }
            });
        },

        logout: function(success, error) {
            $.ajax(this.urlRoot + '/logout', {
                type:'POST',
                success: function(a,b,c) { success(a,b,c); },
                error: function(a,b,c) { error(a,b,c); }
            });
        },

        join: function(success, error) {
            $.ajax(this.urlRoot + '/join', {
                type:'POST',
                data: this.reqdata().toJSON(),
                success: function(a,b,c) { success(a,b,c); },
                error: function(a,b,c) { error(a,b,c); }
            });
        },

        check_id: function(success, error) {
            $.ajax(this.urlRoot + '/check_id', {
                type:'POST',
                data: this.reqdata().toJSON(),
                success: function(a,b,c) { success(a,b,c); },
                error: function(a,b,c) { error(a,b,c); }
            });
        },

        me: function(success, error) {
            $.ajax(this.urlRoot + '/me', {
                type:'GET',
                success: function(a,b,c) { success(a,b,c); },
                error: function(a,b,c) { error(a,b,c); }
            });
        },

        reset_pw: function(success, error) {
            $.ajax(this.urlRoot + '/reset_pw', {
                type:'POST',
                data: this.reqdata().toJSON(),
                success: function(a,b,c) { success(a,b,c); },
                error: function(a,b,c) { error(a,b,c); }
            });
        },

        edit: function(success, error) {
            $.ajax(this.urlRoot + '/edit', {
                type:'POST',
                data: this.reqdata().toJSON(),
                success: function(a,b,c) { success(a,b,c); },
                error: function(a,b,c) { error(a,b,c); }
            });
        }
    } );
} );
