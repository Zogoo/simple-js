/**
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
