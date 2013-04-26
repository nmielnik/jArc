/// <reference path="ja_core.js" />

(function($)
{
    var jqBind = $.fn.bind;
    var jqUnbind = $.fn.unbind;
    var jqTrigger = $.fn.trigger;

    $.extend($.fn,
    /** @lends jQuery.prototype */
    {
        /**
        *  Attach an event handler to an event for all elements/object contained in this object.
        *  This will inspect each element, using  <a href="http://api.jquery.com/bind/">jQuery.bind()</a> to bind to native events or jQuery UI events and using jArc to bind to custom events
        *  <br/><b>NOTE:</b> This method also accepts a map as the first parameter, containing a map of one or more Event names and functions to execute for them.
        *  @example 1) $('#foo').$bind(eventType, handler, context)
        *  @example 2) $('#foo').$bind({
        *     click: function() {
        *       // do something on click
        *     },
        *     mouseenter: function() {
        *       // do something on mouseenter
        *     }
        *   });
        *  @param {String} eventType The name of the event (use the {@link jQuery.On} enum)
        *  @param {Function} handler The event handle to attach
        *  @param {Object} context The context to run the event in (value of 'this' pointer at execution time). If ommitted, the this pointer will be the Object/Element that fired the event.
        *  @returns {jQuery} this
        */
        $bind: function(eventType, handler, context)
        {
            EVT.add(this, eventType, handler, context);
            return this
        },

        /**
        *   Remove a previously-attached event handler from the elements/objects. This will inspect each element, using <a href="http://api.jquery.com/unbind/">jQuery.unbind()</a> 
        *   to remove native event + jQuery UI event handlers and using jArc to remove to custom event handlers
        *   <br/><b>NOTE:</b> This method also accepts a jQuery Event object passed to an event handler to target a specific event/handler to remove
        *   @example 1) $('#foo').$unbind(eventType, handler)
        *   @example 2) $('#foo').$unbind(event) 
        *   event = An event object as passed to an event handler
        *   @param {String} eventType The name of the event (use the {@link jQuery.On} enum)
        *   @param {Function} [handler=null] A reference to the actual function that was attached in order to differential between multiple handlers. A copy of the function will not work.
        *   @returns {jQuery} this
        */
        $unbind: function(eventType, handler)
        {
            EVT.remove(this, eventType, handler);
            return this;
        },

        /**
        *   Execute all handlers and behaviors attached to the matched elements for the given event type. ({@link jQuery.customEvent} can also be used as an alternative to jQuery.$trigger)
        *   <br/><b>NOTE:</b> This method also accepts an already existing event object to use to fire as-is, instead of the 1st argument.
        *   <br/><b>NOTE:</b> This method also accepts a set of key-value pairs to include as members of the event object, instead of the 2nd argument.
        *   @example 1) $('#foo').$trigger('click', window.event)
        *   @example 2) $('#foo').$trigger('click', { foo: 'bar' })
        *   @example 3) $('#foo').$trigger(new jQuery.Event('click'))
        *   @param {String|jQuery.Event} eventType The name of the event (use the {@link jQuery.On} enum)
        *   @param {jQuery.Event|Event|Object} [event=null] Either a javascript event / jQuery.Event to use merge into a new event and pass along, or a set of key-value pairs to store as members of the event object
        *   @result Any value returned by the chain of event handlers
        */
        $trigger: function(eventType, event)
        {
            var arr = [this];
            return EVT.fire.apply(EVT, Array.prototype.concat.apply(arr, arguments));
        },

        /**
        *   Create the jQuery Event object to be passed along to the events handlers for a custom event. trigger() must be called to initiate the event execution.
        *   @example $(this).customEvent('custom', jsEvent).trigger();
        *   @param {String} eventType The name of the event (use the {@link jQuery.On} enum)
        *   @param {jQuery.Event|Event} [event=null] A jQuery or javascript event to merge into this event
        *   @param {Object} [props=null] A set of key-value pairs to add to the new event object
        *   @returns {jQuery.Event} A new jQuery.Event object, with a custom trigger() method to be called to initiate the event execution
        */
        customEvent: function(eventType, event, props)
        {
            return EVT._buildEvent(this.un$(), eventType, props, event);
        },

        /**
        *   Insert every element in the set of matched elements to the end of the target. 
        *   <br/>For <b>DOM element(s)</b>, this will use <a href="http://api.jquery.com/appendTo/">jQuery.appendTo()</a>
        *   <br/>For <b>objects</b>, this will attach this object as a child of the matched object(s) to enable event bubbling.
        *   @param {jQuery|Object} target A selector, element, HTML string, or jQuery object; the matched set of elements will be inserted at the end of the element(s) specified by this parameter. 
        *   For objects, the parent object to attach this object to.
        *   @returns {jQuery} this
        */
        $appendTo: function(target)
        {
            EVT.append(target, this);
            return this;
        },

        /**
        *   Insert content, specified by the parameter, to the end of each element in the set of matched elements.
        *   <br/>For <b>DOM element(s)</b>, <b>HTML string(s)</b>, or <b>jQuery object(s)</b>, this will use <a href="http://api.jquery.com/append/">jQuery.append()</a>
        *   <br/>For <b>objects</b>, this will attach the matched object(s) as children of this object to enable event bubbling.
        *   <br/><b>NOTE:</b> This method also accepts a function which returns an HTML string, DOM element(s), or jQuery object, instead of the 1st argument.
        *   @example 1) $('#foo').$append($('#bar'));
        *   @example 2) $(parentObj).$append($(childObj));
        *   @example 3) $('#foo').$append(function(index, html)
        *   {   // index = index of jQuery wrapper set
        *       // html = previous HTML value of the element
        *       // 'this' = current element in jQuery wrapper set
        *       // Return an HTML string, DOM element, or jQuery object.
        *   });
        *   @param {jQuery|Object} content DOM element, HTML string, or jQuery object to insert at the end of each element in the set of matched elements. 
        *   For objects, the child object(s) to attach as children of this object.
        *   @returns {jQuery} this
        */
        $append: function(content)
        {
            EVT.append(this, content);
            return this;
        }
    });

    $.extend($,
    /** @lends jQuery */
    {
        /** @namespace Enum for all valid native + jQuery UI event types */
        On:
        {
            /** (Mouse) Click event */
            Click: 'click', 
            /** (Mouse) Double Click event */
            DblClick: 'dblclick',
            /** (Mouse) Button Down event */
            MouseDown: 'mousedown',
            /** (Mouse) Button Up event */
            MouseUp: 'mouseup',
            /** (Mouse) Enters Element event */
            MouseEnter: 'mouseenter',
            /** (Mouse) Leaves Element event */
            MouseLeave: 'mouseleave',
            /** (Mouse) Cursor Moves Away From Element event */
            MouseOut: 'mouseout',
            /** (Mouse) Cursor Moves Over Top of Element event */
            MouseOver: 'mouseover',
            /** (Mouse) Cursor Moves event */
            MouseMove: 'mousemove',

            /** (Keyboard) Key Down event */
            KeyDown: 'keydown',
            /** (Keyboard) Key Pressed event */
            KeyPress: 'keypress',
            /** (Keyboard) Key Up event */
            KeyUp: 'keyup',

            /** (Status) User Abort event */
            Abort: 'abort', 
            /** (Status) Error event */
            Error: 'error',
            /** (Status) Load Complete event */
            Load: 'load',
            /** (Status) Unload Complete event */
            Unload: 'unload',
            /** (Status) Ready State Change event */
            ReadyStateChange: 'readystatechange',
            
            /** (Window/Document) Context Menu Appeared event */
            ContextMenu: 'contextmenu',
            /** (Window/Document) Resized event */
            Resize: 'resize',
            /** (Window/Document) Scrolled event */ 
            Scroll: 'scroll', 

            /** (Form/Field) Focus Lost event */
            Blur: 'blur',
            /** (Form/Field) Change event */
            Change: 'change',
            /** (Form/Field) Focuse event */
            Focus: 'focus',
            /** (Form/Field) User Input event */
            Input: 'input',
            /** (Form/Field) User Paste event */
            Paste: 'paste',
            /** (Form/Field) Element Attribute Changed event */
            PropertyChange: 'propertychange',
            /** (Form/Field) Text Selected event */
            Select: 'select',
            /** (Form/Field) User Submit event */
            Submit: 'submit',

            /** (jQuery) <a href="http://api.jquery.com/focusin/">Focus In</a> event */
            FocusInJQ: 'focusin',
            /** (jQuery) <a href="http://api.jquery.com/focusout/">Focus Out</a> event */
            FocusOutJQ: 'focusout'
        }
    });

    var EVT =
    {
        add: function(target, eventType, handler, context)
        {
            if (exists(target))
            {
                if ($.isFunction(handler) && exists(context))
                {
                    handler = $.proxy(handler, context);
                    context = null;
                }
                if ($.isString(eventType))
                    EVT._customOrJQ(EVT._add, $.fn.bind, target, [eventType, handler, context]);
                else if ($.isPlainObject(eventType))
                {
                    $.each(eventType,
                        function(name, fn) { EVT._customOrJQ(EVT._add, $.fn.bind, target, [name, fn]) }
                    );
                }
            }
        },
        remove: function(target, eventType, handler)
        {
            if (exists(target))
            {
                if (target instanceof $.Event)
                {
                    eventType = target.type;
                    target = target.target;
                }
                EVT._customOrJQ(EVT._remove, $.fn.unbind, target, [eventType, handler]);
            }
        },
        fire: function(target, eventType, event)
        {
            if (exists(target))
                return EVT._customOrJQ.apply(EVT, [EVT._fire, $.fn.trigger, target, Array.prototype.slice.call(arguments, 1)]);
            return null;
        },
        append: function(parent, args)
        {
            // jQuery or Array
            if ($.is$(parent) || $.isArray(parent))
            {
                $.each(parent,
                    function(idx, obj)
                    {
                        EVT.append(obj, args);
                    }
                );
            }
            // String or Element
            else if ($.isElement(parent) || $.isString(parent))
                $(parent).append(args);
            // Object
            else
            {
                var child, children = [];
                for (var i = 0; exists(child = args[i]); i++)
                {
                    if ($.is$(child))
                        children = children.concat(child.objects());
                    else
                        children = children.concat($(child).objects());
                }
                if (children.length > 0)
                {
                    if (!exists(parent.childNodes))
                        parent.childNodes = [];
                    $.each(children,
                        function(idx, obj)
                        {
                            if (exists(obj.parentNode))
                            {
                                var arrNew = [];
                                $.each(obj.parentNode.childNodes,
                                    function(idx, next)
                                    {
                                        if (next !== obj)
                                            arrNew.push(next);
                                    }
                                );
                                obj.parentNode.childNodes = arrNew;
                            }
                            parent.childNodes.push(obj);
                            obj.parentNode = parent;
                        }
                    );
                }
            }
        },
        isNative: function(eventType)
        {
            var toRet = false;
            $.each($.On,
            function(idx, str)
            {
                if (str === eventType)
                {
                    toRet = true;
                    return false;
                }
            });
            return toRet;
        },

        // For internal use only
        _evguid: 1,
        _cache: [],
        _guid: function() { return '' + (EVT._evguid++) },
        _mapId: function(name)
        {
            var toRet = { type: '', uid: null };
            if ($.isStrVal(name))
            {
                var parts = name.split('.');
                toRet.type = parts[0].toLowerCase();
                if (parts.length > 1)
                    toRet.uid = parts.slice(1).join('.');
            }
            return toRet;
        },
        _stack: function(guid, type)
        {
            if ($.isStrVal(guid) && $.isString(type))
            {
                if (exists(EVT._cache[guid]))
                    return EVT._cache[guid][type];
            }
            return null;
        },
        _customOrJQ: function(fnCustom, fnJQuery, target, args)
        {
            var toRet = null;
            if (exists(target))
            {
                if (target.jquery)
                {
                    $.each(target, function(idx, obj)
                    {
                        toRet = EVT._customOrJQ(fnCustom, fnJQuery, obj, args);
                    });
                }
                else
                {
                    if (!$.isStrVal(target._guid) && target.nodeType && target[$._jaexpando] !== 'hybrid')
                        toRet = fnJQuery.apply($(target), args);
                    else
                        toRet = fnCustom.apply(EVT, [target].concat(args));
                }
            }
            return toRet;
        },
        _add: function(target, name, fn)
        {
            if ($.isStrVal(name))
            {
                var oName = EVT._mapId(name);
                // Let jQuery handle native events on hybrids
                if (target[$._jaexpando] === 'hybrid' && EVT.isNative(oName.type))
                    $(target).bind(name, fn);
                else
                {
                    if (!$.isStrVal(target._guid))
                        EVT._cache[target._guid = EVT._guid()] = {};
                    var oEvts = EVT._cache[target._guid];
                    if (!oEvts[oName.type])
                        oEvts[oName.type] = new EVT.Stack();
                    oEvts[oName.type].add(oName.uid, fn);
                }
            }
        },
        _remove: function(target, name, fn)
        {
            if ($.isStrVal(target._guid))
            {
                var oName = EVT._mapId(name);
                // Let jQuery handle native events on hybrids
                if (target[$._jaexpando] === 'hybrid' && EVT.isNative(oName.type))
                    $(target).unbind(name, fn);
                else
                {
                    var oStack = EVT._stack(target._guid, oName.type);
                    if (exists(oStack))
                        oStack.remove(oName.uid, fn);
                }
            }
        },
        _fire: function(target, toFire, evt)
        {
            if (exists(toFire))
            {
                var pName = toFire, pEvt = evt;
                if (!$.isString(toFire))
                {
                    pName = toFire.type;
                    pEvt = toFire;
                }

                // If we don't already have a custom jQuery Event, create one
                if (!exists(pEvt) || pEvt[$._jaexpando] !== 'event')
                {
                    // If it's a hybrid and native event name, let jQuery handle it
                    if (target[$._jaexpando] === 'hybrid' && EVT.isNative(pName.split('.')[0]))
                        return $(target).trigger(toFire, evt);
                    // Otherwise, create a jQuery Event
                    var props, event;
                    if (exists(pEvt))
                    {
                        if ($.isPlainObject(pEvt))
                            props = pEvt;
                        else
                            event = pEvt;
                    }
                    pEvt = EVT._buildEvent(target, pName, props, event);
                }

                var stacks = [], curr = target;
                while (exists(curr) && !pEvt.isPropagationStopped())
                {
                    // While traversing the event path, only check for objects which have custom events attached
                    if ($.isStrVal(curr._guid))
                    {
                        var oStack = EVT._stack(curr._guid, pEvt.type);
                        if (exists(oStack))
                        {
                            var handlers = oStack.getHandlers(pEvt.namespace);
                            for (var k = 0; k < handlers.length && !pEvt.isImmediatePropagationStopped(); k++)
                            {
                                pEvt.currentTarget = curr;
                                var res = handlers[k].call(curr, pEvt);
                                if (res !== undefined)
                                {
                                    pEvt.result = res;
                                    if (res === false)
                                    {
                                        pEvt.preventDefault();
                                        pEvt.stopPropagation();
                                    }
                                }
                            }
                        }
                    }
                    curr = curr.parentNode;
                }
                if (!$.isStrVal(pEvt.namespace) && !pEvt.isDefaultPrevented() && $.isFunction(target[pEvt.type]))
                    target[pEvt.type]();
                return pEvt.result;
            }
            return null;
        },
        _buildEvent: function(target, type, props, evt)
        {
            var oName = EVT._mapId(type);
            var $orig = null;
            if (exists(evt))
            {
                // If a custom event is passed, preserved $originalEvent
                if (evt[$._jaexpando] === 'event')
                    $orig = evt.$originalEvent;
                // If a jQuery event is passed, set as $originalEvent
                else if (evt[$.expando])
                    $orig = evt;
                // If a native event is passed, let jQuery normalizes it
                else
                    $orig = $.event.fix(evt);
            }
            props = $.extend($.valOrDef(props, {}),
            {
                namespace: oName.uid,
                target: target,
                currentTarget: target,
                relatedTarget: null,
                result: null,
                isDefaultPrevented: $.retFalse,
                $originalEvent: $orig,
                originalEvent: exists($orig) ? $orig.originalEvent : null,
                trigger: function() { return EVT.fire(this.target, this) }
            }
        );
            props[$._jaexpando] = 'event';
            return $.Event(oName.type, props);
        }
    }

    EVT.Stack = function()
    {
        this.init();
    }
    EVT.Stack.prototype =
    {
        init: function()
        {
            this.order = [];
            this.evts = { '': [] };
        },
        add: function(uid, fn)
        {
            uid = $.isString(uid) ? uid : '';
            var stack = this.evts[uid];
            if (!exists(stack))
                this.evts[uid] = stack = [];
            this.order.push({ id: uid, idx: stack.length });
            stack.push(fn);
        },
        remove: function(uid, fn)
        {
            uid = $.isString(uid) ? uid : '';
            // Remove all handlers
            if (!$.isStrVal(uid))
            {
                this.init();
            }
            else
            {
                var arrOrder = [];
                // Find instances
                for (var i = 0; i < this.order.length; i++)
                {
                    var oInfo = this.order[i];
                    // Remove handlers
                    if (oInfo.id.equals(uid, true) && (!exists(fn) || this.evts[oInfo.id][oInfo.idx] === fn))
                        this.evts[oInfo.id][oInfo.idx] = null;
                    else
                        arrOrder.push(this.order[i]);
                }
                // Remove from order array
                this.order = arrOrder;
            }
        },
        getHandlers: function(uid)
        {
            var handlers = [];
            uid = $.isString(uid) ? uid : '';
            for (var i = 0; i < this.order.length; i++)
            {
                var oInfo = this.order[i];
                if (!$.isStrVal(uid) || oInfo.id.equals(uid, true))
                    handlers.push(this.evts[oInfo.id][oInfo.idx]);
            }
            return handlers;
        }
    }
})(jQuery);