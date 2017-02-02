/**
 * Created by tsogbadrakh on 2016/05/16.
 */
simple.sSessions = sObject.extend({

    init : function() {
        this.destroy();
        console.log('Init from admin');
    },

    deinit : function () {
        console.log('deinit from admin');
    },

    onClick : function (cnt, e, cobj) {
        console.log(cobj);
    },
});
