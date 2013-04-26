/// <reference path="ja_core.js" />

(function($)
{
    $.extend($,
    /** @lends jQuery */
    {
        /** @namespace Namespace for jArc + jQuery UI */
        UI:
        {
            /**
            *   Create a javascript Object inheriting from a DOM element
            *   @param {String} sTag Tag name of the DOM element to create
            *   @param {Object} [oProps=null] Custom jQuery-style attributes to apply to create DOM element
            *   @returns {Object} javascript Object which can be appended to the DOM as an element
            */
            createAsObject: function(sTag, oProps)
            {
                var el = $('<' + sTag + '/>', oProps).un$();
                var base = new Object();
                $.each(base,
                    function(sFnName, oFn)
                    {
                        if ($.isFunction(oFn))
                            el[sFnName] = oFn;
                    }
                );
                return el;
            },
            /**
              * Base class constructor for javascript Object + DOM element hybrids
              * @class 
              * Base class for javascript Object + DOM element hybrids to derive from
              * <br/><b>NOTE:</b>The objConstructor() member method of the derived class will be called before this returns
              * <br/><b>NOTE:</b>The refresh() member method of the derived class will also be called before this returns, unless the objConstructor() method returns false
              * <br/><br/>Each class which wants to derive from Hybrids must define a constructor which returns the result of call this method in it's own context
              * @example var TestHybrid = function(<arguments>)
              * {  
              *     return $.UI.Hybrid.apply(this, [TestHybrid, 'div', null, arguments]) 
              * }
              * @param {Function} fnConstructor The class to derive from Hybrid
              * @param {String} sTag The tag name of the type of DOM element this should be (ie 'div')
              * @param {Object} oProps A set of key-value pairs representing attributes to set on this DOM element (same as props passed to jQuery() method)
              * @param {Array} arrArgs The array of arguments to pass when calling the internal objConstructor method
              * @returns {Node} The javascript Object + DOM element hybrid
              */
            Hybrid: function(fnConstructor, sTag, oProps, arrArgs)
            {
                function _objProto() { }
                _objProto.prototype = fnConstructor.prototype;
                var protoObj = new _objProto();
                var base = $.UI.createAsObject(sTag, oProps || {});

                var iter = $.Iterator(protoObj, {});
                for (var i = 0; i < iter.length; i++)
                {
                    if (!exists(base[iter[i]]))
                        base[iter[i]] = protoObj[iter[i]];
                }
                base[$._jaexpando] = 'hybrid';

                if (base.objConstructor.apply(base, arrArgs) !== false)
                    base.refresh.apply(base, []);

                return base;
            },
            /** @namespace Enum for jArc UI + jQuery UI event names */
            On:
            {
                /** (<a href="http://jqueryui.com/demos/draggable/">Draggable</a> jQuery-UI) create event */
                DragCreateUI: 'dragcreate',
                /** (<a href="http://jqueryui.com/demos/draggable/">Draggable</a> jQuery-UI) start event */
                DragStartUI: 'dragstart',
                /** (<a href="http://jqueryui.com/demos/draggable/">Draggable</a> jQuery-UI) stop event */
                DragStopUI: 'dragstop',
                /** (<a href="http://jqueryui.com/demos/draggable/">Draggable</a> jQuery-UI) drag event */
                DragUI: 'drag',
                /** (<a href="http://jqueryui.com/demos/droppable/">Droppable</a> jQuery-UI) drop event */
                DropUI: 'drop',
                /** (<a href="http://jqueryui.com/demos/droppable/">Droppable</a> jQuery-UI) over event */
                DropOverUI: 'dropover',
                /** (<a href="http://jqueryui.com/demos/droppable/">Droppable</a> jQuery-UI) out event */
                DropOutUI: 'dropout',
                /** (<a href="http://jqueryui.com/demos/droppable/">Droppable</a> jQuery-UI) create event */
                DropCreateUI: 'dropcreate',
                /** (<a href="http://jqueryui.com/demos/droppable/">Droppable</a> jQuery-UI) activate event */
                DropActivateUI: 'dropactivate',
                /** (<a href="http://jqueryui.com/demos/droppable/">Droppable</a> jQuery-UI) deactivate event */
                DropDeactivateUI: 'dropdeactivate',
                /** (<a href="http://jqueryui.com/demos/resizable/">Resizble</a> jQuery-UI) resize event */
                ResizeUI: 'resize',
                /** (<a href="http://jqueryui.com/demos/resizable/">Resizble</a> jQuery-UI) create event */
                ResizeCreateUI: 'resizecreate',
                /** (<a href="http://jqueryui.com/demos/resizable/">Resizble</a> jQuery-UI) start event */
                ResizeStartUI: 'resizestart',
                /** (<a href="http://jqueryui.com/demos/resizable/">Resizble</a> jQuery-UI) stop event */
                ResizeStopUI: 'resizestop',
                /** (<a href="http://jqueryui.com/demos/selectable/">Selectable</a> jQuery-UI) create event */
                SelectableCreateUI: 'selectablecreate',
                /** (<a href="http://jqueryui.com/demos/selectable/">Selectable</a> jQuery-UI) selected event */
                SelectableSelectedUI: 'selectableselected',
                /** (<a href="http://jqueryui.com/demos/selectable/">Selectable</a> jQuery-UI) selecting event */
                SelectableSelectingUI: 'selectableselecting',
                /** (<a href="http://jqueryui.com/demos/selectable/">Selectable</a> jQuery-UI) start event */
                SelectableStartUI: 'selectablestart',
                /** (<a href="http://jqueryui.com/demos/selectable/">Selectable</a> jQuery-UI) stop event */
                SelectableStopUI: 'selectablestop',
                /** (<a href="http://jqueryui.com/demos/selectable/">Selectable</a> jQuery-UI) unselected event */
                SelectableUnselectedUI: 'selectableunselected',
                /** (<a href="http://jqueryui.com/demos/selectable/">Selectable</a> jQuery-UI) unselecting event */
                SelectableUnselectingUI: 'selectableunselecting',
                /** (<a href="http://jqueryui.com/demos/sortable/">Sortable</a> jQuery-UI) crete event */
                SortCreateUI: 'sortcreate',
                /** (<a href="http://jqueryui.com/demos/sortable/">Sortable</a> jQuery-UI) start event */
                SortStartUI: 'sortstart',
                /** (<a href="http://jqueryui.com/demos/sortable/">Sortable</a> jQuery-UI) stop event */
                SortStopUI: 'sortstop',
                /** (<a href="http://jqueryui.com/demos/sortable/">Sortable</a> jQuery-UI) sort event */
                SortUI: 'sort',
                /** (<a href="http://jqueryui.com/demos/sortable/">Sortable</a> jQuery-UI) change event */
                SortChangeUI: 'sortchange',
                /** (<a href="http://jqueryui.com/demos/sortable/">Sortable</a> jQuery-UI) before stop event */
                SortBeforeStopUI: 'sortbeforestop',
                /** (<a href="http://jqueryui.com/demos/sortable/">Sortable</a> jQuery-UI) update event */
                SortUpdateUI: 'sortupdate',
                /** (<a href="http://jqueryui.com/demos/sortable/">Sortable</a> jQuery-UI) receive event */
                SortReceiveUI: 'sortreceive',
                /** (<a href="http://jqueryui.com/demos/sortable/">Sortable</a> jQuery-UI) remove event */
                SortRemoveUI: 'sortremove',
                /** (<a href="http://jqueryui.com/demos/sortable/">Sortable</a> jQuery-UI) over event */
                SortOverUI: 'sortover',
                /** (<a href="http://jqueryui.com/demos/sortable/">Sortable</a> jQuery-UI) out event */
                SortOutUI: 'sortout',
                /** (<a href="http://jqueryui.com/demos/sortable/">Sortable</a> jQuery-UI) activate event */
                SortActivateUI: 'sortactivate',
                /** (<a href="http://jqueryui.com/demos/sortable/">Sortable</a> jQuery-UI) deactivate event */
                SortDeactivateUI: 'sortdeactivate'
            }
        }
    });

    $.UI.Hybrid.prototype =
    /** @lends jQuery.UI.Hybrid.prototype */
    {

        /** Abstract Method - This acts as the default constructor and should be overriden by each class which derives from Hybrid.
        *  <br/>This method will be passed the same arguments as were passed to the origial object constructor.
        *  <br/><b>NOTE:</b> Returning false from this function will prevent the refresh() method from being called during Hybrid creation
        *  @example var UserText = function(a, b, c, props)
        *  {
        *      return $.UI.Hybrid.apply(this, [UserText, 'div', props, arguments]);
        *  }
        *  UserText.prototype =
        *  {
        *      objConstructor: function(a, b, c, props) { // Implement }
        *  }
        */
        objConstructor: function() { },
        /** Abstract Method - This should be called whenever the element needs to update its internal contents.
        *   The Hybrid base constructor will call this method automatically during creation, unless objConstructor() returns false.
        */
        refresh: function() { },
        /** Helper method to determine if this element currently exists in the DOM of the page
        *   @returns {Boolean}
        */
        inDocument: function() { return $.contains(document.documentElement, this) || ($.isStrVal(this.id) && $exists($('#' + this.id))) }
    }

})(jQuery);