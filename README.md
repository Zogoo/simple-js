# SIMPLE JS

Event related Object oriented js front-end frame work. 

Event will register on html panel. All events catch by only one places and event and items will dispatch to panel-related object. 

That's it simple and fast.:+1:

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
