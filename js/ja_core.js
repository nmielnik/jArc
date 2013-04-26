/// <reference path="..\jQuery\jquery-1.7.2.js" />
// <reference path="..\jQuery\jquery-1.7.1-vsdoc.js" />

/** @name jQuery
 * @class Instance of a <a href="http://api.jquery.com/jQuery/">jQuery</a> wrapper object and namespace for generic <a href="http://api.jquery.com/category/utilities/">utility</a> methods*/

/** Returns whether the specified value has a value (not null or undefined)
* @param val Value to check
* @returns {Boolean}
*/
exists = function(val) { return ((val) ? true : (val == 0 || val == false || val == "")) };
/** Returns whether a val exists, or if a jQuery object, whether it contains anything
  * @param val Value/jQuery object to check
  * @returns {Boolean}
*/
$exists = function(val) { return exists(val) && (!$.is$(val) || val.length > 0) };

(function($)
{
    $.extend($,
    /** @lends jQuery */
    {
        /**  Returns the first param if it exists (not null or undefined), otherwise returns the second param
        *  @param val The value to return if it exists
        *  @param def The value to return if val does not exists
        *  @returns one of the two parameters
        */
        valOrDef: function(val, def) { return (exists(val) ? val : def) },

        /** 
        *  Returns the first param if it is a number, otherwise returns zero
        *  @param {Number} number The value to return if it's a number
        *  @param {Boolean} [notNegative=false] Only return the number if it is not negative
        *  @returns {Number}
        */
        numOrZero: function(number, notNegative) { return (exists(number) && $.isNumeric(number) && (!notNegative || number > 0)) ? number : 0 },

        /**
         *  Returns the param if it is an array, otherwise returns either an empty array, or an array containing the param
         *  @param {Array} array The value to either return as-is, or wrap in an array
         *  @returns {Array}
         */
        arrOrEmpty: function(array){return (exists(array) ? ($.isArray(array) ? array : [array]) : [])},

        /**
         *  Returns the param as a string of a specific length. 
         *  If the param is less than the specified number of characters the provided char will be added to the front/end of the string until it meets the required length.
         *  @example strPad('6', 2, '0') = '06'
         *  @param {String} str Value to ensure is a specified length
         *  @param {Number} length Minimum number of characters the returned string should be
         *  @param {String} char The character to use to fill in the string to make it the specified length
         *  @param {Boolean} [suffix=false] Add characters as a suffix instead of a prefix
         *  @returns {String}
         */
        strPad: function(str, length, char, suffix)
        {
            str = (str || '').toString();
            var pre = ($.isNumeric(str) && str.startsWith('-')) ? '-' : '';
            str = str.substring(pre.length);
            while (str.length < length)
                str = (suffix ? '' : char) + str + (suffix ? char : '');
            return pre + str
        },

        /**
         *  Returns whether the specified value is of type 'object'
         *  @param {*} obj Value to check
         *  @returns {Boolean}
         */
        isObject: function(obj){return 'object'.equals(typeof (obj), true)},

        /**
         *  Returns whether the specified value is a jQuery object
         *  @param {*} obj Value to check
         *  @returns {Boolean}
         */
        is$: function(obj){return exists(obj) && obj.jquery },

        /**
         *  Returns whether the specified value is a DOM element or if the first member of a jQuery object is a DOM element
         *  @param {*} el Value to check
         *  @param {String} [tag='*'] A specific, case-insensitive, element type name (ie 'div') to require the element to be
         *  @returns {Boolean}
         */
        isElement: function(el, tag)
        {
            var el = $.is$(el) ? el.un$() : el;
            return (exists(el) &&
                       el.nodeType == 1 &&
                       $.isStrVal(el.tagName) &&
                       (!$.isString(tag) || tag.equals(el.tagName, true)))
        },

        /**
         *  Returns whether the specified value is of type 'string'
         *  @param {String} str Value to check
         *  @returns {Boolean}
         */
        isString: function(str){return typeof (str) === 'string'},

        /**
         *  Returns whether the specified value is a non-empty string (NOTE: By default, whitespace does not count as empty)
         *  @param {*} str Value to check
         *  @param {Boolean} [noWhitespace=false] If this string is only whitespace, count it is empty
         *  @returns {Boolean}
         */
        isStrVal: function(str, noWhitespace){return exists(str) && $.isString(str) && str != "" && (!noWhitespace || str.trim().length != 0)},

        /**
         *  Write the specified value to the browser's javascript console
         *  @param {*} val Value to write to the console
         *  @returns result of console.log()
         */
        log: function(val){return console.log(val)},

        /**
         *  Create a set of key-value pairs representing a specified url 
         *  NOTE: If the url is relative, the values for protocol, domain, and port will be from document.location
         *  @param {String} url The url to parse
         *  @returns { url: (original url), absolute: (full url), protocol: ('http'), domain: ('host'), port: (80) } A set of key-value pairs
         */
        url: function(url)
        {
            var toRet = { url: (url + '') };
            var parts = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/.exec(toRet.url.toLowerCase());
            if (!parts)
            {
                parts = [document.location, document.location.protocol, document.location.hostname, document.location.port];
                toRet.absolute = parts[1] + '//' + parts[2] + (parts[3] == 80 || parts[3] == 443 ? '' : (':' + parts[3])) + '/' + toRet.url;
            }
            toRet.protocol = parts[1];
            toRet.domain = parts[2];
            // Add protocol if not provided (jQuery #5866: IE7 issue with protocol-less urls)
            toRet.port = parts[3] || (toRet.protocol == 'http:' ? 80 : 443);
            return toRet
        },

        /**
         *  Return whether an array contains a specified index, and whether that index has a value.
         *  For multi-dimensional arrays, the existence of an array/value at each level will also be checked
         *  NOTE: There are 2 usages of this function, where multiple indexes can be passed as:
         *  @example Additional parameters passed into the function call
         *  arrExists(array, index, [index2, [index3, .... [index-n]]]) 
         *  @example A single array of indexes
         *  arrExists(array, args) 
         *  @param array {Array} The Array to check for existence
         *  @param index {String|Number|String[]|Number[]} Either an Array of indecies to check, or the first of a series of argument representing each index
         *  @returns {Boolean}
         */
        arrExists: function(array, index)
        {
            if (!exists(array))
                return false;
            var arrIds = $.isArray(index) ? index : arguments;
            var first = $.isArray(index) ? 0 : 1;
            for (var i = first; i < arrIds.length; i++)
            {
                if (!exists(arrIds[i]) || !exists(array[arrIds[i]]))
                    return false;
                array = array[arrIds[i]];
            }
            return true;
        },

        /**
         *  Compliment to {@link String#doubleSplit} Converts a set of key-value pairs into a string. Common usage includes cookies ('; ' + '='), query strings ('&', '='), and AJAX POST data ('&', '=')
         *  @param {Object} map The object containing the key-value pairs to convert into a string
         *  @param {String} [first='&'] The delimeter to use to separate each node of the map.
         *  @param {String} [second='='] The delimeter to use to separate each key-value pair.
         *  @returns {String} A string containing each key-value pair separated via two delimeters
         */
        mapToString: function(map, first, second)
        {
            first = $.valOrDef(first, '&');
            second = $.valOrDef(second, '=');
            var sMap = '';
            var iter = $.Iterator(map, []);
            while (iter.hasNext())
            {
                var oPair = iter.next();
                if (sMap.length != 0)
                    sMap += first;
                sMap += $.valOrDef(oPair.key, '') + second + $.valOrDef(oPair.value, '');
            }
            return sMap
        },

        /**
         *  Run a function immediately after all the native browser events have completed firing
         *  @param {Function} fn The function to run
         *  @param {Function|Object} context The context to run the function (value of 'this' pointer)
         *  @param {Array} [args=[]] The parameters to pass the function when it is called
         *  @returns {Function} A handle to this function (Calling <a href="http://www.w3schools.com/jsref/met_win_cleartimeout.asp">clearTimeout</a> using that handle will cancel its execution)
         */
        runAfter: function(fn, context, args){return setTimeout(function() { fn.apply(context, $.valOrDef(args, [])) }, 0) },

        /** @namespace An expandable Enum for representing various error codes. */
        HR:
        {
            /**
             *  Check the specified error code to verify it represents a error
             *  @param {Number|String} hr The value to check
             *  @returns {Boolean}
             */
            FAILED: function(hr){return (exists(hr) && hr != $.HR.None && hr != $.HR.S_OK) },

            /** No Error Set (uninitialized) */
            None: '',
            /** No Error */
            S_OK: '0'
        },

        /** 
         *  Constructor for a Pair object, which represents a single key-value pair.
         *  @class
         *  An object representing a key-value pair from an object/map
         *  @param {String|Number} key The value of the key
         *  @param {*} value The value of the value
         */
        Pair: function(key, value)
        {
            /** The key
             *  @type String|Number
             */
            this.key = key;
            /** The value 
             *  @type {*}
             */
            this.value = value;
        },

        /**
         *  Constructor for an Iterator object for iterating over an object's property names and values
         *  @class
         *  An object which will iterate over the actual added properties only, not any methods or built-in member
         *  <br/><b>*</b> The Iterator is READ-ONLY so modifying its values will not update the values of the object being iterated over, 
         *  <br/>  and updates to the object will not change the values of the Iterator.
         *  <br/><b>*</b> The Iterator will contain a valid 'length' property which will not change, even if properties are removed/added from the original object.
         *  <br/><b>*</b> When the Iterator is indexed '[]' like a normal array, it will return the key/name of the property at that index
         *  <br/><b>*</b> hasNext() and next() can also be used to iterate, where next() will return a {@link jQuery.Pair} object and move to next key-value pair,
         *  <br/>  hasNext() can be called to verify the Iterator has another value to be returned via next()
         *  @param {Object} target The target object to iterate over
         *  @param {Object} [empty=new target.constructor()] An instance of a empty version of the target object. 
         *  This should be specified if the target does not have a valid constructor method to use, in order to determine which properties should be iterated
         *  @returns {String[]} An Array containing the keys of the object, as well as iterator methods next() and hasNext(). The .length property will be accurate.
         */
        Iterator: function(target, empty)
        {
            var base = new Array();
            if (exists(target) && (exists(empty) || exists(target.constructor)))
            {
                base._next = 0;
                base._target = target;
                var cpy = (exists(empty) ? empty : new target.constructor());
                for (var index in target)
                {
                    if (!exists(cpy[index]))
                        base.push(index);
                }
            }
            return $.extend(base,
            /** @lends jQuery.Iterator.prototype */
            {
                /**
                 *  Return the next {@link jQuery.Pair} object and move to the next key-value pair in the Iterator
                 *  @returns {jQuery.Pair} A jQuery.Pair object containing the next key-value pair
                 */
                next: function()
                {
                    var key = this[this._next];
                    this._next++;
                    return new $.Pair(key, this._target[key]);
                },
                /**
                 *  Return whether the next() method can be called again, or if the Iterator has reached the end of the object it's iterating
                 *  @returns {Boolean}
                 */
                hasNext: function()
                {
                    return (exists(this._next) && (this._next < this.length))
                }
            });
        },

        /** @namespace Enum for all valid types/scopes for input elements including <a href="http://www.w3schools.com/html5/html5_form_input_types.asp">HTML5 Input Types</a> */
        InputType:
        {
            /** <a href="http://www.w3.org/TR/html-markup/input.button.html">Button</a> with no default behavior */
            Button: 'button',
            /** <a href="http://www.w3.org/TR/html-markup/input.checkbox.html">Checkbox Control</a> representing a toggle-able value */
            Checkbox: 'checkbox',
            /** <a href="http://www.w3.org/TR/html-markup/input.file.html">File Control</a> representing file name(s), type(s), and content(s) */
            File: 'file',
            /** <a href="http://www.w3.org/TR/html-markup/input.hidden.html">Hidden Field</a> representing a value not visible/editable by the user */
            Hidden: 'hidden',
            /** <a href="http://www.w3.org/TR/html-markup/input.image.html">Image Control</a> for submitting the form with or without a pair of coordinates */
            Image: 'image',
            /** <a href="http://www.w3.org/TR/html-markup/input.password.html">Password Control</a> for entering a one-line plain-text string value with masked visible characters */
            Password: 'password',
            /** <a href="http://www.w3.org/TR/html-markup/input.radio.html">Radio Button</a> for selecting one out of a list of items */
            RadioButton: 'radio',
            /** <a href="http://www.w3.org/TR/html-markup/input.reset.html">Reset Button</a> for resetting the form */
            Reset: 'reset',
            /** <a href="http://www.w3.org/TR/html-markup/input.submit.html">Submit Button</a> for submitting a form */
            Submit: 'submit',
            /** <a href="http://www.w3.org/TR/html-markup/input.text.html">Text Control</a> for enterting a one-line plain-text string value */
            Textbox: 'text',
            /** HTML5 <a href="http://www.w3.org/TR/html-markup/input.tel.html">Phone Number Control</a> for entering a one-line plain-text string representing a telephone number */
            Phone: 'tel',
            /** HTML5 <a href="http://www.w3.org/TR/html-markup/input.email.html">Email Address Control</a> for entering a string representing one or more e-mail addresses */
            EmailAddress: 'email',
            /** HTML5 <a href="http://www.w3.org/TR/html-markup/input.color.html">Color Control</a> for choosing a string representing a simple color */
            ColorPicker: 'color',
            /** HTML5 <a href="http://www.w3.org/TR/html-markup/input.date.html">Date Control</a> for choosing a string representing a date */
            DatePicker: 'date',
            /** HTML5 <a href="http://www.w3.org/TR/html-markup/input.datetime.html">Date-Time Control</a> for choosing a string representing a non-timezone specific, global date and time */
            DateTime: 'datetime',
            /** HTML5 <a href="http://www.w3.org/TR/html-markup/input.datetime-local.html">Date-Time Control</a> for choosing a string representing a non-timezone specific, local date and time */
            DateTimeLocal: 'datetime-local',
            /** HTML5 <a href="http://www.w3.org/TR/html-markup/input.month.html">Month Control</a> for choosing a string representing a month */
            MonthPicker: 'month',
            /** HTML5 <a href="http://www.w3.org/TR/html-markup/input.number.html">Number Control</a> for entering a string representing a numerical value */
            Number: 'number',
            /** HTML5 <a href="http://www.w3.org/TR/html-markup/input.range.html">Range Control</a> for choosing an imprecise string value representing a numerical value */
            RangePicker: 'range',
            /** HTML5 <a href="http://www.w3.org/TR/html-markup/input.search.html">Search Control</a> for entering a string representing one or more search terms */
            SearchBox: 'search',
            /** HTML5 <a href="http://www.w3.org/TR/html-markup/input.time.html">Time Control</a> for choosing a string representing a non-timezone specific time */
            TimePicker: 'time',
            /** HTML5 <a href="http://www.w3.org/TR/html-markup/input.url.html">URL Control</a> for entering a string representing an absolute URL */
            URL: 'url',
            /** HTML5 <a href="http://www.w3.org/TR/html-markup/input.week.html">Week Control</a> for choosing a string representing a week */
            WeekPicker: 'week'
        },

        /**
         *  Returns whether the specified value is considered a type of textbox input.
         *  @param {String} type The value to check
         *  @returns {Boolean}
         */
        isTextboxType: function(type)
        {
            return $.isStrVal(type) &&
                        (type.equals($.InputType.Textbox) ||
                         type.equals($.InputType.Password) ||
                         type.equals($.InputType.Phone) ||
                         type.equals($.InputType.EmailAddress) ||
                         type.equals($.InputType.Number) ||
                         type.equals($.InputType.SearchBox) ||
                         type.equals($.InputType.URL))
        }
    });


    $.extend($.fn,
    /** @lends jQuery.prototype */
    {
        /**
         *  Return an array containing all of the actual JS objects contained in this jQuery object.
         *  DOM Elements, jQuery, and other non-Objects will execluded.
         *  <b>NOTE</b> This is a deep copy, so individual Arrays and/or jQuery objects will be searched as well.
         *  @returns {Object[]} An array containing non-jQuery and non-DOM-Element objects
         */
        objects: function()
        {
            var toRet = [];
            $.each(this,
                    function(idx, obj)
                    {
                        if ($.is$(obj))
                            toRet = toRet.concat(obj.objects());
                        else if (jQuery.isArray(obj))
                            toRet = toRet.concat($(obj).objects());
                        else if ($.isObject(obj))
                            toRet.push(obj);
                    }
                );
            return toRet;
        },
        /**
         *  Returns the first object/element of this jQuery object (Not jQuery wrapped)
         *  @returns {Object|Node}
         */
        un$: function(){return this[0] }
    });

    /**
     *  Define an object this object derives from. In the event of a method conflict, this methods of [this] object will replace the methods of [base] object.
     *  <br/><b><u>NOTE:</u></b> In order to inherit the functionality in the [base] object constructor a corresponding call into the [base] function will need to be called within this object's constructor.
     *  @example (inside [this] object's constructor):
     *  [base].apply(this, [arguments]);</i>
     *  @param {Function} base The base class to inherit prototype defined methods from
     *  @returns this
     */
    Function.prototype.derivesFrom = function(base)
    {
        var origMembers = this.prototype;
        function proto() { }
        proto.prototype = base.prototype;
        this.prototype = new proto();
        this.prototype.constructor = this;
        this.prototype._super = base.prototype;
        var self = this;
        $.each(origMembers,
                function(sName, fnMethod) { self.prototype[sName] = origMembers[sName] }
            );
        return this
    }

    /**
        Identical behavior to {@link Function#derivesFrom}, but this should be used to symbolize that the object is implementing an interface, rather than deriving from a base class
        @see Function#derivesFrom
        @param {Function} interface The base class to inherit prototype defined methods from
        @returns this
    */
    Function.prototype.implements = function(interface){return this.derivesFrom(interface) }

    /** Compares this String to another string for equality
        @param {String} string String to compare this String to
        @param {Boolean} [ignoreCase=false] Do a case-insensitive comparison
        @returns {Boolean}
    */
    String.prototype.equals = function(string, ignoreCase){return (!$.isString(string)) ? false : (ignoreCase ? this.toLowerCase() == string.toLowerCase() : this == string) }

    /** Returns a copy of this string with all prefixed and suffixed whitespace removed 
        @returns new {String}
    */
    String.prototype.trim = function(){return $.trim(this)}

    /** Returns the position of the first occurrence of a specified value in a string.
        <br/> -1 is returned if the value never occurs
        @param {String} searchValue The string to search for
        @param {Boolean} [ignoreCase=false] Do a case in-sensitive search
        @param {Number} [start=0] The index to start the search from
        @returns {Number} The first 0-based index where the beginning of searchValue is located (or -1 if not found)
    */
    String.prototype.find = function(searchValue, ignoreCase, start){return (!$.isString(searchValue)) ? -1 : (ignoreCase ? this.toLowerCase().indexOf(searchValue.toLowerCase(), start) : this.indexOf(searchValue, start)) }

    /** Returns whether a specified string occurs within another string.
        @param {String} searchValue The string to search for
        @param {Boolean} [ignoreCase=false] Do a case in-sensitive search
        @returns {Boolean}
    */
    String.prototype.contains = function(searchValue, ignoreCase){return (this.length === 0 || searchValue.length === 0) ? false : this.find(searchValue, ignoreCase) != -1 }

    /** Returns whether a strings is prefixed by a specified string.
        @param {String} prefix The string to search for
        @param {Boolean} [ignoreCase=false] Do a case-insensitive search
        @returns {Boolean}
     */
    String.prototype.startsWith = function(prefix, ignoreCase){return this.find(prefix, ignoreCase) === 0 }

    /** Replaces 0-based indexed portions '{#}' of a string with the corresponding value passed in the n-length arguments list.
     *  @param {String} arg1 String to use as the replacement to {0} in this string
     *  @param {String} [arg2=null] String to use as the replacement to {1} in this string
     *  @example 'Text {0} text {1} text {0}'.format('param1', 'param2') 
     *  // 'Text param1 text param2 text param1'
     *  @example '...'.format('0-value', '1-value', ... 'n-value')
     *  @returns {String} A new copy of this string with the replaced values
     */
    String.prototype.format = function(arg1, arg2)
    {
        var str = this;
        for (var i = 0; exists(arguments[i]); i++)
            str = str.replace(new RegExp('\\{' + i + '\\}', 'g'), arguments[i]);
        return str;
    }

    /** Compliment to {@link jQuery.mapToString} Creates a dictionary/map by splitting a string, and splitting each of those parts into key-value pairs.
     *  <br/><b>1.</b> First, splits this string using 'first' param.
     *  <br/><b>2.</b> After the split, each section will be split into two parts on the first occurence of 'second' param, resulting in a KEY string and a VALUE string.
     *  <br/><b>3.</b> If the VALUE string is empty (the section doesn't contain second, or the only occurence is at the end of the section), the value in the dictionary for that KEY will be null.
     *  <br/><b><i>NOTES:</i></b> 
     *  <br/>- Empty Keys are stored as Empty Strings, but empty values are stored as null.
     *  <br/>- By default, if the VALUE string is at least 1 character long, the entire VALUE string will be stored as the value for that Key.
     *  <br/>- However, if multi-valued keys are enabled (true passed as param), the VALUE string will be split using second, and the resulting array will be stored as the value for that KEY.
     *  @example 'key1=val1&amp;param2=value2&amp;something=else'.doubleSplit("&", "=")  
     *  // { key1: 'val1', param2: 'value2', something: 'else' }
     *  @param {String} first The first string to split on (ie: The delimeter sepearting each node of the dictionary)
     *  @param {String} [second=undefined] The second string to split on (ie: The delimeter sepearting the key-value pairs of the dictionary). If not passed, the value for each key will be null.
     *  @param {Boolean} [valuesAsArrays=false] Create the dictionary such that the value corresponding to each key is either null or an array of 1 or more strings.
     *  @returns {Object} Map containing key-value pairs
     */
    String.prototype.doubleSplit = function(first, second, valuesAsArrays)
    {
        var toRet = [];
        if ($.isString(first))
        {
            var arr = this.split(first);
            second = second || '';
            for (var i = 0; i < arr.length; i++)
            {
                if (arr[i].length > 0)
                {
                    var iIndex = arr[i].find(second);
                    if (iIndex == -1)
                        toRet[arr[i]] = null;
                    else
                    {
                        var key = (iIndex == 0) ? '' : arr[i].substring(0, iIndex);
                        var sValue = (iIndex < (arr[i].length - 1)) ? arr[i].substring(iIndex + 1) : null;
                        if (!exists(sValue) || !valuesAsArrays)
                            toRet[key] = sValue;
                        else
                            toRet[key] = sValue.split(second);
                    }
                }
            }
        }
        return toRet
    }

    // Internal usage only
    $._jarc = '1.0.0';
    $._jaexpando = 'jArc' + ($._jarc + Math.random()).replace(/\D/g, '');
    $.retFalse = function() { return false };
})(jQuery);