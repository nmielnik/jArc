// <reference path="..\jQuery\jquery-1.7.2.js" />
/// <reference path="..\jQuery\jquery-1.7.1-vsdoc.js" />

// Intellisense/Comment Overview
// <var> <param> <field> <returns>
//      type="ValueType"                    // HTMLElement, Window, Document, or [Constructor]
//      elementType="ArrayElementType"      // If Array, type of array Elements
//      value="code"                        // (Not for <var>) Set an actual value for intellisense to use
//      domElement="true|false"             // [Overwritten by type] Whether this is a DOM element
//      elementDomElement="true|false"      // [Overwritten by elementType] If Array, whether the array Elements are DOM elements
//      >InnerText<                         // Description Text
// <param>
//      name="parameterName"                // [Required]
//      optional="true|false"               // Whether this is an optional parameter
// <field>
//      name="fieldName"                    // [Required]
//      static="true|false"                 // True if this is only a member of an instance of this object. False if local member of an instance

// Global Functions
exists = function(val)
{
    /// <summary>
    ///     Returns whether the specified value has a value (not null or undefined)
    /// </summary>
    /// <param name="val">
    ///     Value to check
    /// </param>
    /// <returns type="Boolean" />
};
$exists = function(val)
{
    /// <summary>
    ///     Returns whether a val exists, or if a jQuery object, whether it contains anything
    /// </summary>
    /// <param name="val">
    ///     Value/jQuery object to check
    /// </param>
    /// <returns type="Boolean" />
};

// Function prototype definitions
Function.prototype.derivesFrom = function(base)
{
    /// <summary>
    ///     Define an object this object derives from. In the event of a method conflict, this methods of [this] object will replace the methods of [base] object.
    ///     &#10;NOTE: In order to inherit the functionality in the [base] object constructor a corresponding call into the [base] function will need to be called during this object's constructor.
    ///     &#10;ie: [base].apply(this, [arguments]);
    /// </summary>
    /// <param name="base" type="Function">
    ///     The base class to inherit prototype defined methods from
    /// </param>
    /// <returns value="this" />
};

Function.prototype.implements = function(interface)
{
    /// <summary>
    ///     (see .derivesFrom) This has identical behavior to derivesFrom, but should be used to symbolize that the object is implementing an interface, rather than deriving from a base class
    /// </summary>
    /// <param name="interface" type="Function">
    ///     The base class to inherit prototype defined methods from
    /// </param>
    /// <returns type="this" />
};

// String prototype definitions
String.prototype.equals = function(string, ignoreCase)
{
    /// <summary>
    ///     Compares this String to another string for equality
    /// </summary>
    /// <param name="string" type="String">
    ///     String to compare this String to
    /// </param>
    /// <param name="ignoreCase" optional="true">
    ///     Do a case-insensitive comparison (default = false)
    /// </param>
    /// <returns type="Boolean" />
};

String.prototype.trim = function()
{
    /// <summary>
    ///     Returns a copy of this string with all prefixed and suffixed whitespace removed
    /// </summary>
    /// <returns type="String" />
};

String.prototype.find = function(searchValue, ignoreCase, start)
{
    /// <summary>
    ///     Returns the position of the first occurrence of a specified value in a string.
    ///     &#10;-1 is returned if the value never occurs
    ///  </summary>
    /// <param name="searchValue" type="String">
    ///     The string to search for
    /// </param>
    /// <param name="ignoreCase" type="Boolean" optional="true">
    ///     Do a case in-sensitive search (default = false)
    /// </param>
    /// <param name="start" type="Number" optional="true">
    ///     The index to start the search from (default = 0)
    /// </param>
    /// <returns type="Number">The position where the specified searchValue occurs for the first time, or -1 if it never occurs</returns>
};

String.prototype.contains = function(searchValue, ignoreCase)
{
    /// <summary>
    ///     Returns whether a specified string occurs within another string.
    /// </summary>
    /// <param name="searchValue" type="String">
    ///     The string to search for
    /// </param>
    /// <param name="ignoreCase" type="Boolean" optional="true">
    ///     Do a case in-sensitive search (default = false)
    /// </param>
    /// <returns type="Boolean" />
};

String.prototype.startsWith = function(prefix, ignoreCase)
{
    /// <summary>
    ///     Returns whether a strings is prefixed by a specified string.
    /// </summary>
    /// <param name="prefix" type="String">
    ///     The string to search for
    /// </param>
    /// <param name="ignoreCase" type="Boolean">
    ///     Do a case-insensitive search (default = false)
    /// </param>
    /// <returns type="Boolean" />
};

String.prototype.format = function(arg1, arg2)
{
    /// <summary>
    ///     Replaces indexed portions of a string with the corresponding value passed in the arguments list.
    ///     &#10;ie: If this string was 'Text {0} text {1} text {0}', each {0} would be replaced with the first argument passed in, and each {1} would be replaced with the second argument passed in, etc.
    /// </summary>
    /// <param name="arg1" type="String" optional="true">
    ///     String to use as the replacement to {0} in this string
    /// </param>
    /// <param name="arg2" type="String" optional="true">
    ///     String to use as the replacement to {1} in this string
    /// </param>
    /// <returns type="String">A new copy of this string with the replaced values</returns>
};

String.prototype.doubleSplit = function(first, second, valuesAsArrays)
{
    /// <summary>
    ///     (Compliment to $.mapToString) Creates a dictionary by splitting a string, and splitting each of those parts into key-value pairs.
    ///     &#10;First, splits this string using delimeter one. 
    ///     After the split, each section will be split into two parts on the first occurence of second, resulting in a KEY string and a VALUE string.
    ///     If the VALUE string is empty (the section doesn't contain second, or the only occurence is at the end of the section),
    ///     the value in the dictionary for that KEY will be null. Empty Keys are stored as Empty Strings, but empty values are stored as null.
    ///     By default, if the VALUE string is at least 1 character long, the entire VALUE string will be stored as the value for that Key. 
    ///     However, if multi-valued keys are enabled (true passed as param), the VALUE string will be split using second, and the resulting array
    ///     will be stored as the value for that KEY.</summary>
    /// <param name="first" type="String">
    ///     The first string to split on (ie: The delimeter sepearting each node of the dictionary)
    /// </param>
    /// <param name="second" type="String" optional="true">
    ///     The second string to split on (ie: The delimeter sepearting the key-value pairs of the dictionary). If not passed, the value for each key will be null.
    /// </param>
    /// <param name="valuesAsArrays" type="Boolean" optional="true">
    ///     Create the dictionary such that the value corresponding to each key is either null or an array of 1 or more strings. (default = false)
    /// </param>
    /// <returns type="Array" elementType="Array">A set of key-value pairs</returns>
};

jQuery.valOrDef = function(val, def)
{
    /// <summary>
    ///     Returns the first param if it exists (not null or undefined), otherwise returns the second param
    /// </summary>
    /// <param name="val">
    ///     The value to return if it exists
    /// </param>
    /// <param name="def">
    ///     The value to return if val does not exists
    /// </param>
    /// <returns value="val || def">One of the parameters</returns>
};
jQuery.numOrZero = function(number, notNegative)
{
    /// <summary>
    ///     Returns the first param if it is a number, otherwise returns zero
    /// </summary>
    /// <param name="number" type="Number">
    ///     The value to return if it's a number
    /// </param>
    /// <param name="notNegative" optional="true">
    ///     Only return the number if it is not negative (default = false)
    /// </param>
    /// <returns type="Number" />
};
jQuery.arrOrEmpty = function(array)
{
    /// <summary>
    ///     Returns the param if it is an array, otherwise returns either an empty array, or an array containing the param
    /// </summary>
    /// <param name="array" type="Array">
    ///     The value to either return as-is, or wrap in an array
    /// </param>
    /// <returns type="Array" />
};
jQuery.strPad = function(str, length, char, suffix)
{
    /// <summary>
    ///     Returns the param as a string of a specific length. If the param is less than the specified number of characters
    ///     the provided char will be added to the front/end of the string until it meets the required length.
    /// </summary>
    /// <param name="str" type="String">
    ///     Value to ensure is a specified length
    /// </param>
    /// <param name="length" type="Number">
    ///     Minimum number of characters the returned string should be
    /// </param>
    /// <param name="char" type="String">
    ///     The character to use to fill in the string to make it the specified lenght
    /// </param>
    /// <param name="suffix" type="Boolean" optional="true">
    ///     Add characters as a suffix instead of a prefix (default = false)
    /// </param>
    /// <returns type="String" />
};
jQuery.isObject = function(obj)
{
    /// <summary>
    ///     Returns whether the specified value is of type 'object'
    /// </summary>
    /// <param name="obj" type="Object">
    ///     Value to check
    /// </param>
    /// <returns type="Boolean" />
};
jQuery.is$ = function(obj)
{
    /// <summary>
    ///     Returns whether the specified value is a jQuery object
    /// </summary>
    /// <param name="obj" type="jQuery">
    ///     Value to check
    /// </param>
    /// <returns type="Boolean" />
};
jQuery.isElement = function(el, tag)
{
    /// <summary>
    ///     Returns whether the specified value is a DOM element or if the first member of a jQuery object is a DOM element
    /// </summary>
    /// <param name="el" type="HTMLElement|jQuery">
    ///     Value to check
    /// </param>
    /// <param name="tag" type="String" optional="true">
    ///     A specific, case-insensitive, element type name (ie 'div') to require the element to be (def = any element)
    /// </param>
    /// <returns type="Boolean" />
};
jQuery.isString = function(str)
{
    /// <summary>
    ///     Returns whether the specified value is of type 'string'
    /// </summary>
    /// <param name="str" type="String">
    ///     Value to check
    /// </param>
    /// <returns type="Boolean" />
};
jQuery.isStrVal = function(str, noWhitespace)
{
    /// <summary>
    ///     Returns whether the specified value is a non-empty string
    /// </summary>
    /// <param name="str" type="String">
    ///     Value to check
    /// </param>
    /// <param name="noWhitespace" type="Boolean" optional="true">
    ///     If this string is only whitespace, count it is empty (default = false)
    /// </param>
    /// <returns type="Boolean" />
};
jQuery.log = function(val)
{
    /// <summary>
    ///     Write the specified value to the browser's javascript console
    /// </summary>
    /// <param name="val">
    ///     Value to write to the console
    /// </param>
    /// <returns value="console.log()">The result</returns>
};
jQuery.url = function(url)
{
    /// <summary>
    ///     Create a set of key-value pairs representing a specified url
    ///     &#10;Properties: { url (original url), absolute (full url), protocol ('http'), domain ('host'), port (80) }
    ///     &#10;NOTE: If the url is relative, the values for protocol, domain, and port will be from document.location
    /// </summary>
    /// <param name="url" type="String">
    ///     The url to parse
    /// </param>
    /// <returns>A set of key-value pairs (url, absolute, protocol, domain, port)</returns>
};
jQuery.arrExists = function(array, index)
{
    /// <summary>
    ///     Return whether an array contains a specified index, and whether that index has a value.
    ///     &#10;For multi-dimensional arrays, the existence of an array/value at each level will also be checked
    ///     &#10;1 - arrExists(array, [index, index2, index3, ....]) Uses each argument as a separate index for each dimension of the array
    ///     &#10;2 - arrExists(array, args) Uses the 2nd argument as an array containing a separate index for each dimension of the array
    /// </summary>
    /// <param name="array" type="Array">
    ///     The Array to check for existence
    /// </param>
    /// <param name="index" type="Array|String|Number">
    ///     Either an Array of indecies to check, or the first of a series of argument representing each index
    /// </param>
    /// <returns type="Boolean" />
};
jQuery.mapToString = function(map, first, second)
{
    /// <summary>
    ///     (Compliment to String.doubleSplit) Converts a set of key-value pairs into a string. Common usage includes cookies ('; ' + '='), query strings ('&', '='), and AJAX POST data ('&', '=')
    /// </summary>
    /// <param name="map" type="Object">
    ///     The object containing the key-value pairs to convert into a string
    /// </param>
    /// <param name="first" type="String" optional="true">
    ///     The delimeter to use to separate each node of the map. (default = '&')
    /// </param>
    /// <param name="second" type="String" optional="true">
    ///     The delimeter to use to separate each key-value pair. (default = '=')
    /// </param>
    /// <returns type="String">A string containing each key-value pair separated via two delimeters</returns>
};
jQuery.runAfter = function(fn, context, args)
{
    /// <summary>
    ///     Run a function immediately after all the native browser events have completed firing
    /// </summary>
    /// <param name="fn" type="Function">
    ///     The function to run
    /// </param>
    /// <param name="context" type="Function|Object">
    ///     The context to run the function (value of 'this' pointer)
    /// </param>
    /// <param name="args" type="Array" optional="true">
    ///     The parameters to pass the function when it is called
    /// </param>
    /// <returns>A handle to this function (Calling clearTimeout using that handle will cancle its execution)</returns>
};

jQuery.HR =
{
    /// <summary>An expandable Enum for representing various error codes.</summary>

    FAILED: function(hr)
    {
        /// <summary>
        ///     Check the specified error code to verify it represents a error
        /// </summary>
        /// <param name="hr" type="Number|String">
        ///     The value to check
        /// </param>
        /// <returns type="Boolean" />
    },

    /// <field type="String" static="true">No Error Set (uninitialized)</field>
    None: '',
    /// <field type="String">No Error</field>
    S_OK: '0'
};

jQuery.Pair = function(key, value)
{
    /// <summary>
    ///     Constructor for a Pair object, which represents a single key-value pair.
    /// </summary>
    /// <param name="key" type="String|Number">
    ///     The value of the key
    /// </param>
    /// <param name="value">
    ///     The value of the value
    /// </param>
    /// <field name="key" type="String|Number">The key</field>
    /// <field name="value">The value</field>
};

jQuery.Iterator = function(target, empty)
{
    /// <summary>
    ///     Creates a new Iterator object which will iterate over the actual added properties only, not any methods or built-in member
    ///     &#10;The Iterator is READ-ONLY so modifying its values will not update the values of the object being iterated over, and updates to the object will not change the values of the Iterator.
    ///     &#10;The Iterator will contain a valid 'length' property which will not change, even if properties are removed/added from the original object.
    ///     &#10;When the Iterator is indexed '[]' like a normal array, it will return the key/name of the property at that index
    ///     &#10;hasNext() and next() can also be used to iterate, where next() will return a $.Pair object and move to next key-value pair,
    ///     hasNext() can be called to verify the Iterator has another value to be returned via next()
    /// </summary>
    /// <param name="target" type="Object">
    ///     The target object to iterate over
    /// </param>
    /// <param name="empty" type="Object" optional="true">
    ///     An instance of a empty version of the target object. This should be specified if the target does not have a valid constructor method to use, in order to determine which properties should be iterated
    /// </param>
    /// <returns type="Array" elementType"String">An Array containing the keys of the object, as well as iterator methods next() and hasNext()</returns>
    var base = new Array();
    base.next = function()
    {
        /// <summary>
        ///     Return the next $.Pair object and move to the next key-value pair in the Iterator
        /// </summary>
        /// <returns type="$.Pair">A $.Pair object containing the next key-value pair</returns>
    };
    base.hasNext = function()
    {
        /// <summary>
        ///     Return whether the next() method can be called again, or if the Iterator has reached the end of the object it's iterating
        /// </summary>
        /// <returns type="Boolean" />
    };
    return base;
}

/// <summary>Enum for all valid types for input elements</summary>
jQuery.InputType =
{
    Button: 'button',
    Checkbox: 'checkbox',
    File: 'file',
    Hidden: 'hidden',
    Image: 'image',
    Password: 'password',
    RadioButton: 'radio',
    Reset: 'reset',
    Submit: 'submit',
    Textbox: 'text',
    /* HTML5 */
    Phone: 'tel',
    EmailAddress: 'email',
    ColorPicker: 'color',
    DatePicker: 'date',
    DateTime: 'datetime',
    DateTimeLocal: 'datetime-local',
    MonthPicker: 'month',
    Number: 'number',
    RangePicker: 'range',
    SearchBox: 'search',
    TimePicker: 'time',
    URL: 'url',
    WeekPicker: 'week'
}

jQuery.isTextboxType = function(type)
{
    /// <summary>
    ///     Returns whether the specified value is considered a type of textbox input.
    /// </summary>
    /// <param name="type" type="String">
    ///     The value to check
    /// </param>
    /// <returns type="Boolean" />
};

jQuery.prototype.objects = function()
{
    /// <summary>
    ///     Return an array containing all of the actual JS objects contained in this jQuery object.
    ///     &#10;DOM Elements, jQuery, and other non-Objects will execluded.
    ///     &#10;This is a deep copy, so individual Arrays and/or jQuery objects will be searched as well.
    /// </summary>
    /// <returns type="Array" elementType="Object">An array containing non-jQuery and non-DOM-Element objects</returns>
};

jQuery.prototype.un$ = function()
{
    /// <summary>
    ///     Returns the first object/element of this jQuery object (Not jQuery wrapped)
    /// </summary>
    /// <returns type="Object|HTMLElement" />
};

jQuery.prototype.$bind = function(eventType, handler, context)
{
    /// <summary>
    ///     Attach an event handler to an event for the elements. This will inspect each element, using jQuery.bind() to bind to native events or jQuery UI events
    ///     and using jArc to bind to custom events
    ///     &#10; 1.0 - $bind(eventType, handler, context)
    ///     &#10; 1.1 - $bind(events) events = A map of one or more DOM event types and functions to execute for them (jQuery Only)
    /// </summary>
    /// <param name="eventType" type="String">
    ///     The name of the event (use the $.On enum)
    /// </param>
    /// <param name="handler" type="Function">
    ///     The event handle to attach
    /// </param>
    /// <param name="context" type="Function" optional="true">
    ///     The context to run the event in (value of 'this' pointer at execution time). If ommitted, the this pointer will be the Object/Element that fired the event (default jQuery behavior)
    /// </param>
    /// <returns type="jQuery">jQuery</returns>
};

jQuery.prototype.$unbind = function(eventType, handler)
{
    /// <summary>
    ///     Remove a previously-attached event handler from the elements/objects. This will inspect each element, using jQuery.unbind() to remove native event + jQuery UI event handlers
    ///     and using jArc to remove to custom event handlers
    ///     &#10; 1.0 - $unbind(eventType, handler)
    ///     &#10; 1.1 - $unbind(event) event = An event object as passed to an event handler
    /// </summary>
    /// <param name="eventType" type="String">
    ///     The name of the event (use the $.On enum)
    /// </param>
    /// <param name="handler" type="Function" optional="true">
    ///     A reference to the actual function that was attached. A copy of the function will not work.
    /// </param>
    /// <returns type="jQuery">jQuery</returns>
};

jQuery.prototype.$trigger = function(eventType, event)
{
    /// <summary>
    ///     Execute all handlers and behaviors attached to the matched elements for the given event type. (Also, see jQuery.customEvent as an alternative to jQuery.$trigger)
    ///     &#10; 1.0 - $trigger(eventType, event)
    ///     &#10; 1.1 - $trigger(eventType, props) props = A set of key-value pairs to include as members of the event object
    ///     &#10; 2.0 - $trigger(event) event = An already existing event object to use to fire as-is
    /// </summary>
    /// <param name="eventType" type="String">
    ///     The name of the event (use the $.On enum)
    /// </param>
    /// <param name="event" type="jQuery.Event|Event|Object" optional="true">
    ///     Either a javascript event / jQuery.Event to use merge into a new event and pass along, or a set of key-value pairs to store as members of the event object
    /// </param>
    /// <returns>The result (if any) returned by the chain of event handlers</returns>
};

jQuery.prototype.customEvent= function(eventType, event, props)
{
    /// <summary>
    ///     Create the jQuery Event object to be passed along to the events handlers for a custom event. trigger() must be called to initiate the event execution.
    /// </summary>
    /// <param name="eventType" type="String">
    ///     The name of the event (use the $.On enum)
    /// </param>
    /// <param name="event" type="jQuery.Event|Event" optional="true">
    ///     A jQuery or javascript event to merge into this event
    /// </param>
    /// <param name="props" type="Object" optional="true">
    ///     A set of key-value pairs to add to the new event object
    /// </param>
    /// <returns>A new jQuery.Event object, with a custom trigger() method to be called to initiate the event execution</returns>
};

jQuery.prototype.$appendTo = function(target)
{
    /// <summary>
    ///     Insert every element in the set of matched elements to the end of the target. 
    ///     &#10; For DOM elements, this will use jQuery.appendTo()
    ///     &#10; For objects, this will attach this object as a child of the matched object(s) to enable event bubbling.
    /// </summary>
    /// <param name="target" type="jQuery|Object">
    ///     A selector, element, HTML string, or jQuery object; the matched set of elements will be inserted at the end of the element(s) specified by this parameter. For objects, the parent object to attach this object to.
    /// </param>
    /// <returns type="jQuery" />
};

jQuery.prototype.$append = function(content)
{
    /// <summary>
    ///     Insert content, specified by the parameter, to the end of each element in the set of matched elements.
    ///     &#10; For DOM element(s), HTML string(s), or jQuery object(s), this will use jQuery.append()
    ///     &#10; For objects, this will attach the matched object(s) as children of this object to enable event bubbling.
    ///     &#10; 1.0 - $append(content)
    ///     &#10; 1.1 - $append(function(index, html)) function(index, html) = A function that returns an HTML string, DOM element(s), or jQuery object. index = index in set, html = old HTML value of the element. 'this' = current element in set.
    /// </summary>
    /// <param name="content" type="jQuery|Object">
    ///     DOM element, HTML string, or jQuery object to insert at the end of each element in the set of matched elements. For objects, the child object(s) to attach as children of this object.
    /// </param>
    /// <returns type="jQuery" />
};

/// <summary>Enum for all native (non-custom) event types, including jQuery UI Events</summary>
jQuery.On =
{
    /* Native Mouse Events */
    Click: 'click', DblClick: 'dblclick', MouseDown: 'mousedown', MouseUp: 'mouseup',
    MouseEnter: 'mouseenter', MouseLeave: 'mouseleave',
    MouseOut: 'mouseout', MouseOver: 'mouseover',
    MouseMove: 'mousemove',

    /* Native Keyboard Events */
    KeyDown: 'keydown', KeyPress: 'keypress', KeyUp: 'keyup',

    /* Frame/Object Events */
    Abort: 'abort', ContextMenu: 'contextmenu', Error: 'error', Load: 'load',
    ReadyStateChange: 'readystatechange', Resize: 'resize', Scroll: 'scroll', Unload: 'unload',

    /* Native Form Events */
    Blur: 'blur', Change: 'change', Focus: 'focus', Input: 'input', Paste: 'paste',
    PropertyChange: 'propertychange', Select: 'select', Submit: 'submit',

    /* jQuery Events */
    FocusInJQ: 'focusin', FocusOutJQ: 'focusout',

    /* jQuery-UI Events */
    DragStartUI: 'dragstart', DragStopUI: 'dragstop', DropUI: 'drop', DragOverUI: 'dropover'
}

jQuery.jajax = function(url, props)
{
    /// <summary>
    ///     Creates a jQuery wrapped jQuery.AJAXRequest object, ready to be sent by calling the send() method
    ///     &#10;1 - jQuery.jajax(url, props) 
    ///     &#10;2 - jQuery.jajax(props) (url must be present in props)
    /// </summary>
    /// <param name="url" type="String">
    ///     A string containing the URL to which the request is sent
    /// </param>
    /// <param name="props" type="Object">
    ///     A set of key/value pairs used for this request: url (string) | maxtime (number [ms]) | async (bool) | headers (key/value) | success (function) | error (function) | timeout (function) | complete (function)
    /// </param>
    /// <returns type="jQuery">The jQuery wrapped $.AJAXRequest</returns>
    var oReq = jQuery(new jQuery.AJAXRequest(props));
    oReq.send = function(request, event)
    {
        /// <summary>
        ///     Start the asynchronous HTTP (Ajax or script) request.
        ///     &#10;1 - send(request, event)
        ///     &#10;2 - send(request) 
        /// </summary>
        /// <param name="request" type="string" optional="true">
        ///     The data to pass via the POST body for POST's, or via the QueryString for GETs. Also can be passed as a set of key/value pairs to be converted as (prop)=(val)&amp;(prop2)=(val2)&amp;...
        /// </param>
        /// <param name="event" type="jQuery.Event" optional="true">
        ///     jQuery.Event object to store and use as the root event which triggering custom events
        /// </param>
        /// <returns type="$.AJAXRequest">The Plain AJAX Handler object (not jQuery wrapped)</returns>
    };
    return oReq;
}

jQuery.AJAXRequest = function(oProps)
{
    
};

jQuery.AJAXRequest.prototype =
{
    send: function(request, event)
    {
        /// <summary>
        ///     Start the asynchronous HTTP (Ajax or script) request.
        ///     &#10;1 - send(request) 
        ///     &#10;2 - send(request, event)
        /// </summary>
        /// <param name="request" type="string" optional="true">
        ///     The data to pass via the POST body for POST's, or via the QueryString for GETs. Also can be passed as a set of key/value pairs to be converted as (prop)=(val)&amp;(prop2)=(val2)&amp;...
        /// </param>
        /// <param name="event" type="jQuery.Event" optional="true">
        ///     jQuery.Event object to store and use as the root event which triggering custom events
        /// </param>
        /// <returns type="$.AJAXRequest">The Plain AJAX Handler object (not jQuery wrapped)</returns>
    },
    cancel: function()
    {
        /// <summary>
        ///     Stop the AJAX request immediately. If the AJAX call has not completed, this will force the requst to stop, causing the ajaxerror event and ajaxcomplete events to fire.
        /// </summary>
        /// <returns value="this" />
    },
    getText: function()
    {
        /// <summary>
        ///     Get the AJAX response data as raw text
        /// </summary>
        /// <returns type="String" />
    },
    getJSON: function()
    {
        /// <summary>
        ///     Attempt to convert the AJAX response data into a JSON object.
        /// </summary>
        /// <returns type="Object" />
    },
    getXML: function()
    {
        /// <summary>
        ///     Attempt to convert the AJAX response data into an XML Document.
        /// </summary>
        /// <returns type="XMLDocument" />
    },
    getRequestText: function()
    {
        /// <summary>
        ///     Get the data sent in this request as a string.
        /// </summary>
        /// <returns type="String" />
    },
    getRequestData: function()
    {
        /// <summary>
        ///     Get the data sent in this request as a set of key-value pairs.
        /// </summary>
        /// <returns type="Object" />
    },
    getLatency: function()
    {
        /// <summary>
        ///     Get the amount of time (in milliseconds) between when this request was initiated, and the response was received.
        /// </summary>
        /// <returns type="Number" />
    },
    isComplete: function()
    {
        /// <summary>
        ///     Returns whether this AJAX request has not yet been sent, or is currently sending. A completed or timed-out request will return false.
        /// </summary>
        /// <returns type="Boolean" />
    },
    isSuccess: function()
    {
        /// <summary>
        ///     Returns whether this AJAX request completed successfully.
        ///     &#10; A request is considered successful when a response was received, and the HTTP Status code is in the 200's range, or 304.
        /// </summary>
        /// <returns type="Boolean" />
    },
    getState: function()
    {
        /// <summary>
        ///     Returns the current state of the AJAX Request, including the custom 'timeout' state. (See values of $.AJAX.State enum or the W3C ajax specification)
        /// </summary>
        /// <returns type="Number" />
    },
    getStatus: function()
    {
        /// <summary>
        ///     Returns the current HTTP Status Code of the AJAX Request, including 502 for 'timeout' status. (See values of $.HTTP enu, or any HTTP Status Code specifications).
        ///     &#10; Status Codes 200 - 206, as well as 304 are considered successful.
        /// </summary>
        /// <returns type="Number" />
    },
    getStatusText: function()
    {
        /// <summary>
        ///     Returns the status text of the AJAX Request, including 'NONE (Timeout)' for 'timeout' status.
        /// </summary>
        /// <returns type="String" />
    },
    set_url: function(url)
    {
        /// <summary>
        ///     Change the target Url of this AJAX request.
        /// </summary>
        /// <param name="url" type="String">
        ///     The target Url to use (can be both relative or absolute)
        /// </param>
        /// <returns value="this" />
    },
    set_headers: function(headers)
    {
        /// <summary>
        ///     Change the request headers to be sent during non-cross domain AJAX requets. (Cross-domain requests do not use an XmlHttpRequest object, so headers cannot be sent)
        ///     &#10; Defaults unless overwritten: ('Content-type', 'Accept', 'X-Requested-With')
        /// </summary>
        /// <param name="headers" type="Object">
        ///     A set of key-value pairs to use as the header field names and values.
        /// </param>
        /// <returns value="this" />
    }
}

jQuery.JSON = function(data)
{
    /// <summary>
    ///     Create a well-defined object around an unknown set of JSON data, exposing basic methods for getting, setting, verifying, and iterating JSON data.
    ///     If the JSON data does not exist or is malformed, this object will be empty and a call to the fromJSON() method will return false.
    ///     An example for usage of this object is when using data from an AJAX call. If the call succeeds, this object would be initialized with valid data
    ///     and passed to other functions. If the AJAX call fails or the data is invalid, this object could be created with null passed as the data, and default
    ///     values could be manually set. The code which operates on the data can then always run even if the AJAX call fails, and if needed, can use the fromJSON()
    ///     method if behavior should be different rather than having to maintain the state of the AJAX call.
    /// </summary>
    /// <param name="date" type="Object">
    ///     The JSON data this jQuery.JSON object represents
    /// </param>
}

jQuery.JSON.prototype =
{
    fromJSON: function()
    {
        /// <summary>
        ///     Returns whether the JSON data used to initialize this jQuery.JSON object had valid data
        /// </summary>
        /// <returns type="Boolean" />
    },
    hasValue: function(eName)
    {
        /// <summary>
        ///     Returns whether this JSON data contains a specific value. (NOTE: This will return false for undefined, null, or an empty string)
        /// </summary>
        /// <param name="eName" type="String">
        ///     The property to check for existence
        /// </param>
        /// <returns type="Boolean" />
        return ($.arrExists(this._props, eName) && !(this._props[eName] === ""))
    },
    "get": function(eName)
    {
        /// <summary>
        ///     Returns the value of a property if it exists, otherwise return an empty string
        /// </summary>
        /// <param name="eName" type="String">
        ///     The name of the property to retrieve
        /// </param>
        /// <returns type="String">The value of the property or an empty string</returns>
    },
    "set": function(eName, oValue)
    {
        /// <summary>
        ///     Manually sets the value of a property
        /// </summary>
        /// <param name="eName" type="String">
        ///     The name of the property to set
        /// </param>
        /// <param name="oValue">
        ///     The value of the property to set
        /// </param>
        /// <returns value="this" />
    },
    each: function()
    {
        /// <summary>
        ///     Iterates over all the properties of the internal data using a jQuery.each loop.
        ///     The parameters passed to this method should be the same as those passed to a jQuery.each() loop, except for the first parameter
        /// </summary>
        var arr = [this._props];
        return $.each.apply($, Array.prototype.concat.apply(arr, arguments));
    }
}

jQuery.AJAX =
{
    /// <summary>Whether logging to the console is enabled for all jaJAX requests</summary>
    EnableLogging: false,
    /// <summary>An enum for valid HTTP Request types (See http://www.w3.org/Protocols/rfc2616/rfc2616-sec5.html#sec5.1.1 for HTTP protocol specification)</summary>
    Req:
    {
        // 'Safe' Methods - No side-effects
        OPTIONS: "OPTIONS", // Request URI Options
        GET: "GET", // Send data to server
        HEAD: "HEAD", // Request URI without body
        TRACE: "TRACE",

        // Methods w/ server/external side-effects
        POST: "POST",  // Request URI
        PUT: "PUT", // Store data for URI
        DELETE: "DELETE", // Delete data for URI
        CONNECT: "CONNECT"
    },
    Accepts:
    {
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript",
        script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
        all: ["*/"] + ["*"]
    },
    State:
    {
        Uninitialized: 0, // The object has been created, but not initialized (the open method has not been called).
        Open: 1, // The object has been created, but the send method has not been called.
        Sent: 2, // The send method has been called. responseText is not available. responseBody is not available.
        Receiving: 3, // Some data has been received. responseText is not available. responseBody is not available.
        Loaded: 4, // All the data has been received. responseText is available. responseBody is available. 
        Timeout: 5 // [CUSTOM STATE] The AJAX Request has Timed Out
    },
    On:
    {
        Success: 'ajaxsuccess',
        Error: 'ajaxerror',
        Timeout: 'ajaxtimeout',
        Complete: 'ajaxcomplete'
    }
};

/// <summary>An enum for all valid HTTP Status Codes</summary>
jQuery.HTTP =
{
    // Experimental
    Continue: 100,    // Initial response received and not rejected, continue sending request or wait for response
    SwitchingProtocols: 101,    // Server accepts upgrade request, will switch to protocls defined in respone's Upgrade header field

    // Request Success
    OK: 200,    // Success. GET->Return entity, HEAD->Send entity-header w/o body, POST->Return entity describing action result, TRACE->Return entity contaiing request message
    Created: 201,    // Request fufilled, new resource created. URI(s) of resoure returned via Location header field, format specified by media type in Content-Type header field
    Accepted: 202,    // Request accepted, but not complete. Estimate completion or pointer to status monitor should be provided.
    NonAuthoritativeInfo: 203,    // Success. Metainformation in entity-header is not from original server, but from a local or 3rd-party copy.
    NoContent: 204,    // Request fufilled, but no Body to return. Metainformation may be updated, but client should not change displayed document.
    ResetContent: 205,    // Request fufilled and client should reset document displayed. Response will not include an entity.
    PartialContent: 206,    // Partial Range/If-Range GET request fufilled. Reponse will include Content-Range/Content-Type + Date + ETag and/or Content-Location + Expires, Cache-Control, and/or Vary.

    // Redirection
    MultipleChoices: 300,    // The requested resource corresponds to multiple representations. For non-HEAD requests, list of resources and locations returned via response, via Content-Type header field.
    MovedPermanently: 301,    // The requested resource has been assigned a new permanent URI, given via Location field and hyperlink in Response (for non-HEAD requests)
    Found: 302,    // The requested resource has been assigned a new temporary URI, given via Location field and hyperlink in Response (for non-HEAD requests)
    SeeOther: 303,    // The response can be found via GET to a different URI, given via Location field, as well as via hyperlink in Response (for non-HEAD requests).
    NotModified: 304,    // GET request allowed, but document has not been modified.
    UseProxy: 305,    // The requested resource must be accessed via repeating request to proxy given by Location field.
    TemporaryRedirect: 307,    // The requested resource has been assigned a new temporary URI, given via Location field and hyperlink in Response (for non-HEAD requests). If not a GET or HEAD request, confirm with user before redirecting.

    // Client-Error Responses
    BadRequest: 400,
    Unauthorized: 401,
    Forbidden: 403,
    NotFound: 404,
    MethodNotAllowed: 405,
    NotAcceptable: 406,
    ProxyAuthRequired: 407,
    RequestTimeout: 408,    // A request was not produced quickly enough to the Server.
    Conflict: 409,
    Gone: 410,
    LengthRequired: 411,
    PreConditionFailed: 412,
    RequestEntityTooLarge: 413,
    RequestUriTooLong: 414,
    UnsupportedMediaType: 415,
    RequestedRangeNotSuitable: 416,
    ExpectationFail: 417,

    // Server-Error Responses
    ServerError: 500,
    NotImplemented: 501,
    BadGateway: 502,
    ServiceUnavailable: 503,
    GatewayTimeout: 504,    // Timeout while server was acting as a gateway or proxy.
    HttpVersionNotSupported: 505,    // Server does not support HTTP protocol version requested. Description and alternatives should be provided.

    OK_IE: 1223
}

jQuery.CK =
{
    Name: {},
    ExpireDateString: 'Thu, 2 Aug 2001 20:47:11 UTC',
    PersistDateString: 'Sun, 4 Nov 2037 10:31:15 UTC',
    isEnabled: function()
    {
        /// <summary>
        ///     Return whether cookies are current enabled for this user's browser
        /// </summary>
        /// <returns type="Boolean" />
    },
    write: function(name, value, persist)
    {
        /// <summary>
        ///     Writes a cookie to the domain passed as a parameter. 
        ///     &#10; - Persistent cookies will have an expiration in 2037.  
        ///     &#10; - Blank cookies will be assumed to be cookie deletes, and will expire in the past.
        /// </summary>
        /// <param name="name" type="String">
        ///     The name of the cookie
        /// </param>
        /// <param name="value" type="String">
        ///     The value of the cookie
        /// </param>
        /// <param name="persist" type="Boolean" optional="true">
        ///     Make the cookie persistant beyond this sessions (default = false)
        /// </param>
        /// <returns>void</returns>
    },
    remove: function(name)
    {
        /// <summary>
        ///     Removes a cookie and its value
        /// </summary>
        /// <param name="name" type="String">
        ///     The name of the cookie
        /// </param>
        /// <returns>void</returns>
    },
    "get": function(name)
    {
        /// <summary>
        ///     Get the value of a cookie
        /// </summary>
        /// <param name="name" type="String">
        ///     The name of the cookie to retriee a value for
        /// </param>
        /// <returns type="String">The value of the cookie, or null if it does not exists</returns>
    },
    getMap: function(name, first, second)
    {
        /// <summary>
        ///     Get the vaue of a cookie dictionary as a set of key-value pairs
        /// </summary>
        /// <param name="name" type="String">
        ///     The name of the cookie to retrieve a value for
        /// </param>
        /// <param name="first" type="String" optional="true">
        ///     The string which separates each node of the map (default = '&')
        /// </param>
        /// <param name="second" type="String" optional="true">
        ///     The string which separates each key-value pair in the map (default = '=')
        /// </param>
        /// <returns>A set of key-value pairs resulting from calling doubleSpit on the cookie value</param>
    }
}