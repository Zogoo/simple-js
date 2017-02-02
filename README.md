# SIMPLE JS

Panel related Object oriented js front-end very lite framework. 

Event will be register on html panel(some window of you ui, not each button and selector). And all events are catched by only one places, then event and items will be pass to panel-related object. 

Example: Use case
1. Catching all events entire dashboard window 
2. User click dashboard refresh button
3. Event and refresh button paramters are pass to Dashboard.js
4. Dashboard.js is get data from back-end
5. Calculate and update old status.

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
