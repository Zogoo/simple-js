# Simple event dispatcher

Object oriented event dispatcher framework.

This framework help you manage your JS code cleanly. Escpecially if your UI requires work on lot of events.

# How it works

It will catch events from entire page dispatch to your defined class with target object. With your defined class you can implement logics OOP programming style.

For example: When you have dashboard page with lot of buttons. And when user click dashboard refresh button.

1. Event and refresh button's target objects are passes to Dashboard.js
2. Dashboard.js can have ajax functions retreive all new data.
3. Do some calculation in side of JS and update those data to UI.

Manage your events and create your object oriented js structure.

And here's some code! 

```javascript
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
```

### Stuff used to make this:

 * [object.js](https://github.com/Zogoo/simple-js/blob/master/object.js) Super object
 * [core.js](https://github.com/Zogoo/simple-js/blob/master/core.js) Loader and Dispatch
 * [ajax.js](https://github.com/Zogoo/simple-js/blob/master/ajax.js) Ajax library
 * [sessions.js](https://github.com/Zogoo/simple-js/blob/master/sessions.js) Sample panel object
