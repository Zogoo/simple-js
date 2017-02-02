/**
 * Created by tsogbadrakh on 2016/05/13.
 */
SCONST = {};
SCONST.USERPATH = "";
SCONST.JSPATH = "/asset/";

MSG = {};

MSG.WARNING = 1;
MSG.ERROR = 2;
MSG.INFO = 3;/**
 * Created by tsogbadrakh on 2016/05/13.
 */
simple = {};

simple.activeComponent = "";

sObject = function(){};

/**
 *
 */
sObject.prototype.deinit = function() {
    // Event.remove(window, this.method) ;
    this.method = null ;
} ;

/**
 *
 */
sObject.prototype.init = function() {
    var self = this ;
    this.method = function() { self.deinit() ; } ;
    //Event(window, Event.UNLOAD, this.method) ;
} ;

/**
 *
 */
sObject.prototype.destroy = function() {
    return arguments.callee.caller.parent.apply(this, arguments) ;
} ;

/**
 *
 */
sObject.extend = function(cclass)
{
    var classDef = function()
    {
        if (arguments[0] != sObject)
        {
            this.init.apply(this, arguments) ;
        }
    } ;

    var proto = new this(sObject) ;
    var superClass = this.prototype ;

    for(var n in cclass)
    {
        var item = cclass[n] ;
        if (item instanceof Function)
        {
            item.parent = superClass[n] ;
        }
        proto[n] = item ;
    }

    proto.parent = superClass ;
    classDef.prototype = proto ;

    classDef.extend = this.extend ;
    return classDef ;
};

Function.prototype.attach = function(object)
{
    var __method = this;
    var args = Array.prototype.slice.call(arguments, 1) ;

    var func = function()
    {

        if(__method)
        {
            return __method.apply(object, args.concat(Array.prototype.slice.call(arguments, 0)));
        }
    };

    func.unbind = function()
    {
        args = null;
        func.binded = true;
        func = null;
        __method = null;
    };

    func.getMethod = function()
    {
        return __method;
    };
    func.binded = true;
    return func;
};
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
/**
 * Created by tsogbadrakh on 2016/05/16.
 */
var SIMPLE_EVENT = function(target, eventName, func)
{
    if (target != null)
    {
        $(target).bind(eventName, func);
    }
    else
    {
        return null ;
    }
};

SIMPLE_EVENT.CLICK = "click";
SIMPLE_EVENT.BEFOREUNLOAD = "beforeunload";
SIMPLE_EVENT.UNLOAD = "unload";

SIMPLE_EVENT.DROP = "drop";

SIMPLE_EVENT.DRAG = "dragstart";
SIMPLE_EVENT.DRAGOVER = "dragover";

SIMPLE_EVENT.ONLOAD = "load";
SIMPLE_EVENT.FOCUS = "focus";
SIMPLE_EVENT.BLUR = "blur";
SIMPLE_EVENT.ONSELECTSTART = "selectstart";

SIMPLE_EVENT.MOUSEDOWN = "mousedown";
SIMPLE_EVENT.MOUSEMOVE = "mousemove";
SIMPLE_EVENT.MOUSEUP = "mouseup";
SIMPLE_EVENT.MOUSEOVER = "mouseover";
SIMPLE_EVENT.MOUSEOUT = "mouseout";

SIMPLE_EVENT.KEYDOWN = "keydown";
SIMPLE_EVENT.KEYUP = "keyup";
SIMPLE_EVENT.KEYPRESS = "keypress";
SIMPLE_EVENT.LOAD = "load";
SIMPLE_EVENT.CHANGE = "change";
SIMPLE_EVENT.CUT = "cut";
SIMPLE_EVENT.PASTE = "paste";
SIMPLE_EVENT.LOSECAPTURE = "losecapture";
SIMPLE_EVENT.CONTEXTMENU = "contextmenu";
SIMPLE_EVENT.SUBMIT = "submit";
SIMPLE_EVENT.RESIZE = "resize";
SIMPLE_EVENT.SCROLL = "scroll";


SIMPLE_EVENT.remove = function(target)
{
    try
    {
        $(target).unbind(eventName);
    }
    catch ( e )
    {

    }
};

SIMPLE_EVENT.removeAll = function(target)
{

    if ( !target.events )
    {
        return;
    }

    $(target).unbind();
};

SIMPLE_EVENT.getTarget = function(event)
{
    var e = event || window.event;
    return e.target ? e.target : e.srcElement;
};

SIMPLE_EVENT.getEvent = function(event)
{
    var e = event || window.event;
    return e;
};

SIMPLE_EVENT.isCtrlKey = function(event)
{
    var e = event || window.event;
    // ctrlキー押下判定
    if ( e )
    {
        return ( typeof e.modifiers == 'undefined' ) ? e.ctrlKey : e.modifiers & Event.CONTROL_MASK;
    }
};

SIMPLE_EVENT.getMousePos = function(event, target)
{
    var e = event || window.event;
    var ps = {};
    ps.x = e.offsetX ? ( e.offsetX ) : e.pageX - ( target ? target.offsetLeft : 0 );
    ps.y = e.offsetY ? ( e.offsetY ) : e.pageY - ( target ? target.offsetTop : 0 );
    return ps;
};

SIMPLE_EVENT.stopPropagation = function(event)
{
    if ( event.preventDefault )
    {
        event.preventDefault();
        event.stopPropagation();
    }
    event.returnValue = false;
    event.cancelBubble = true;
};

simple.sManager = sObject.extend({
    /**
     * 初期化関数。コンポーネントの必要なオブジェクトやデータを初期化する。
     *
     * @param element 初期化するDOMオブジェクト
     */
    init : function(cmp) {
        this.destroy();

        $(document).bind('page:change', this.onLoad.attach(this));

        // simple.sajax.loadJs("/assets/constant.js");
        // simple.sajax.loadJs("/assets/sutil.js");
    },

    deinit : function(cmp)
    {
        this.destroy();
    },

    onLoad : function (event) {

        var controlName = $('body').attr("ctrl");
        var actionName = $('body').attr("act");

        filename = "s" + controlName.toLowerCase() + ".js";
        menuId = controlName;

        var main_class = "s" + simple.sutil.firstUpper(controlName) ;
        var sub_class ="s" + menuId.toLowerCase() ;

        simple.sajax.loadJs(SCONST.JSPATH + filename);

        try{
            if (simple[main_class] === undefined)
            {
                throw "表示するコンテンツがありません。";
            }
            else
            {
                try
                {
                    simple[sub_class] = new simple[main_class]();
                    simple.activeComponent = sub_class;
                }
                catch(e)
                {
                    throw "表示するコンテンツがありません。";
                }

            }
        }
        catch(e) {
            throw "Fatal Error: Object is missing";
        }


        this.contents =  $('body') ;

        if (this.contents)
        {
            SIMPLE_EVENT(this.contents, SIMPLE_EVENT.CLICK, this.dispatch.attach(this, SIMPLE_EVENT.CLICK));
            SIMPLE_EVENT(this.contents, SIMPLE_EVENT.CHANGE, this.dispatch.attach(this, SIMPLE_EVENT.CHANGE));
            SIMPLE_EVENT(this.contents, SIMPLE_EVENT.MOUSEOVER, this.dispatch.attach(this, SIMPLE_EVENT.MOUSEOVER));
            SIMPLE_EVENT(this.contents, SIMPLE_EVENT.MOUSEOUT, this.dispatch.attach(this, SIMPLE_EVENT.MOUSEOUT));
            SIMPLE_EVENT(this.contents, SIMPLE_EVENT.MOUSEDOWN, this.dispatch.attach(this, SIMPLE_EVENT.MOUSEDOWN));
            SIMPLE_EVENT(this.contents, SIMPLE_EVENT.KEYUP, this.dispatch.attach(this, SIMPLE_EVENT.KEYUP));
            SIMPLE_EVENT(this.contents, SIMPLE_EVENT.KEYDOWN, this.dispatch.attach(this, SIMPLE_EVENT.KEYDOWN));
        }
    },

    dispatch : function (type, e) {

        e = SIMPLE_EVENT.getEvent(e);
        var tcnt = SIMPLE_EVENT.getTarget(e);

        var acnt = this.getActiveWindow() ;

        if (acnt != null)
        {
            try{
                switch(type)
                {
                    case SIMPLE_EVENT.MOUSEOVER:
                        acnt.onMouseOver(acnt, e, tcnt) ;
                        break ;

                    case SIMPLE_EVENT.MOUSEOUT:
                        acnt.onMouseOut(acnt, e, tcnt) ;
                        break ;

                    case SIMPLE_EVENT.MOUSEDOWN:
                        acnt.onMouseDown(acnt, e, tcnt) ;
                        break ;

                    case SIMPLE_EVENT.CLICK:
                        if (!tcnt.disabled)
                        {
                            acnt.onClick(acnt, e, tcnt) ;
                        }
                        break ;

                    case SIMPLE_EVENT.CHANGE:
                        acnt.onChange(acnt, e, tcnt) ;
                        break ;

                    case SIMPLE_EVENT.KEYUP:
                        acnt.onKeyUp(acnt, e, tcnt) ;
                        break ;

                    case SIMPLE_EVENT.KEYDOWN:
                        acnt.onKeyDown(acnt, e, tcnt) ;
                        break ;
                }
            }
            catch(e)
            {
            }

        }
    },

    getActiveWindow : function () {
        return simple[simple.activeComponent];
    },
});

simple.smanager = new simple.sManager();
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
