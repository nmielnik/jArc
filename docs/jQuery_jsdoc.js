/** @name jQuery
 * @class Instance of a <a href="http://api.jquery.com/jQuery/">jQuery</a> wrapper object and namespace for generic <a href="http://api.jquery.com/category/utilities/">utility</a> methods
 * @param {String} selector A string containing a selector expression used to match a set of elements
 * @param {Document|Node|jQuery} [context=window] A DOM Element, Document, or jQuery to use as context
 * @param {Node} element A DOM element to wrap in a jQuery object.
 * @param {Object} object A plain object to wrap in a jQuery object.
 * @param {Node[]} elementArray An array containing a set of DOM elements to wrap in a jQuery object
 * @param {jQuery} jQueryObject An existing jQuery object to clone
 * @param {String} html A string of HTML to create on the fly. Note that this parses HTML, not XML.
 * @param {Document} [ownerDocument=document] A document in which the new elements will be created
 * @param {String} htmlElement A string defining a single, standalone, HTML element (e.g. &lt;div/&gt; or &lt;div&gt;&lt;/div&gt;).
 * @param {Object} props An map of attributes, events, and methods to call on the newly-created element.
 * @param {Function} callback The function to execute when the DOM is ready.
 * @return jQuery
 * @type jQuery
 * @example $(selector, context) Accepts a string containing a CSS selector 
 * which is then used to match a set of elements.
 * 
 * $('div.foo');
 * @example $(element) Wrap jQuery functionality around a single 
 * DOM Element, Window, or XML.
 *
 * $(document.getElementById('foo'));
 * @example $(object) Wrap a plain object in a jQuery object. 
 * The only jQuery operations supported on plain JavaScript objects are: 
 * .data(),.prop(),.bind(), .unbind(), .trigger() and .triggerHandler()
 * 
 * // define a plain object
 * var foo = {foo:'bar', hello:'world'};
 * // wrap this with jQuery
 * var $foo = $(foo);
 * @example $(elementArray) Wrap jQuery functionality around an array of DOM Elements.
 *
 * $(document.getElementsByTagName('a'));
 * @example $(jQueryObject) Clone a pre-existing jQuery object
 * 
 * var foo = $('div.foo');
 * var bar = $(foo);
 * @example $(html, ownerDocument) Create DOM elements on-the-fly 
 * from the provided String of raw HTML. 
 *
 * $('&lt;p id="test"&gt;My &lt;em&gt;new&lt;/em&gt; text&lt;/p&gt;').appendTo('body');
 * @example $(htmlElement, props) Creates DOM elements on-the-fly
 * from the provided string of raw HTML.
 *
 * $('&lt;input type="text" /&gt;').attr({ name: 'test' }).appendTo('body');
 * @example $(callback) Binds a function to be executed when the DOM has loaded.
 * <b>NOTE:</b> <i>The function is chainable</i>
 *
 * $(function(){
 *     // Document is ready
 * });
 */