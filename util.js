/**
 * Created by tsogbadrakh on 2016/05/16.
 */
simple.sUtil = sObject.extend({

    init : function () {
        this.destroy();

        var userAgent = window.navigator.userAgent.toLowerCase();
        var appVersion = window.navigator.appVersion.toLowerCase();

        if (userAgent.indexOf("msie") > -1)
        {
            this.IE = true;
            if (appVersion.indexOf("msie 6") > -1)
            {
                this.version = 6;
                this.IE6 = true;
            }
            else if (appVersion.indexOf("msie") > -1)
            {
                this.version = userAgent.substr(userAgent.indexOf("msie") + 5, 1) ;
                this.version == 8 && (this.IE8 = true);
            }
        }
        else if (userAgent.indexOf("firefox") > -1)
        {
            this.FF = true;
            this.version = userAgent.substr(userAgent.indexOf("firefox") + 8) ;
        }
        else if (userAgent.indexOf("opera") > -1)
        {
            this.OPERA = true;
        }
        else if (userAgent.indexOf("chrome") > -1)
        {
            this.CHROME = true;
        }
        else if (userAgent.indexOf("safari") > -1)
        {
            this.SAFARI = true;
        }

    },

    firstUpper : function(str)
    {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },
});

simple.sutil = new simple.sUtil();
