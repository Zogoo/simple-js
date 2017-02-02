/**
 * Created by tsogbadrakh on 2016/05/16.
 */
simple.sAjax = sObject.extend({

    ERR_FAIL : {
        'common' : {
            'infoFlag' : '0',
            'msgType' : 'E',
            'msgCode' : '',
            'message' : 'リソースの取得に失敗しました。'
        }
    },
    ERR_TIMEOUT : {
        'common' : {
            'infoFlag' : '0',
            'msgType' : 'E',
            'msgCode' : '',
            'message' : 'タイムアウトしました。'
        }
    },

    /** */
    TIMEOUT : 30000,

    /**
     *
     */
    init : function(element) {
        this.destroy();
        this.pattern = /\.html$|\.js$|\.css$|\.json$|\.gif$|\.jpg$/;
    },

    /**
     *
     */
    loadResource : function(filename, tag)
    {
        if (!this.hasResource(filename, tag))
        {
            var ref = document.createElement(tag);
            if (tag == "link")
            {
                ref.setAttribute("rel", "stylesheet");
                ref.setAttribute("type", "text/css");
                ref.setAttribute("href", filename);
            }
            else
            {
                ref.setAttribute("type", "text/javascript");
                ref.setAttribute("src", filename);
            }
            if (typeof ref != "undefined")
            {
                document.getElementsByTagName("head")[0].appendChild(ref);
            }
        }
    },

    /**
     *
     */
    loadCss : function(filename)
    {
        this.loadResource(filename, "link");
    },

    /**
     *
     */
    loadJs : function(filename)
    {
        this.loadResource(filename, "script");
    },

    /**
     *
     */
    hasResource : function(filename, tag)
    {
        return this.removeResource(filename, tag, true);
    },

    /**
     *
     */
    removeResource : function(filename, tag, flag)
    {
        var targetattr = tag == "link" ? "href" : "src";
        var allsuspects = document.getElementsByTagName(tag);
        for ( var i = allsuspects.length; i >= 0; i--)
        {
            if (allsuspects[i] && allsuspects[i].getAttribute(targetattr) != null && allsuspects[i].getAttribute(targetattr).indexOf(filename) != -1)
                if (flag)
                {
                    allsuspects[i].parentNode.removeChild(allsuspects[i]);
                }
                else
                {
                    return true;
                }
        }
        return false;
    },

    /**
     *
     */
    removeJs : function(filename)
    {
        this.removeResource(filename, "script", false);
    },

    /**
     *
     */
    removeCss : function(filename)
    {
        this.removeResource(filename, "link", false);
    },


});

simple.sajax = new simple.sAjax();
