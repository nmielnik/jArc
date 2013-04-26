/// <reference path="ja_events.js" />
/// <reference path="ja_core.js" />

(function($)
{

$.extend($,
/** @lends jQuery */
{
    /**
    *   Creates a jQuery wrapped {@link jQuery.AJAXRequest} object, ready to be started by calling the send() method
    *   <br/><b>NOTE:</b> The send() method exposed on this jQuery wrapped object will internally call the {@link jQuery.AJAXRequest#send} method of the {@link jQuery.AJAXRequest} object.
    *   See that method for parameters to pass.
    *   @param {String} url A string containing the URL to which the request is sent
    *   @param {Object} props A set of key/value pairs used for this request: 
    *   <br/>url (string) | maxtime (number [ms]) | async (bool) | headers (key/value) | success (callback) | error (callback) | timeout (callback) | complete (callback)
    *   @returns {jQuery} A {@link jQuery} wrapped {@link jQuery.AJAXRequest} object
    */
    jajax: function(url, props)
    {
        if (!props)
            props = url;
        else if ($.isString(url))
            props.url = url;
        var oReq = $(new $.AJAXRequest(props));
        oReq.send = function(request, event) { return this.un$().send(request, event) };
        if ($.isFunction(props.success))
            oReq.$bind($.AJAX.On.Success, props.success);
        if ($.isFunction(props.error))
            oReq.$bind($.AJAX.On.Error, props.error);
        if ($.isFunction(props.timeout))
            oReq.$bind($.AJAX.On.Timeout, props.error);
        if ($.isFunction(props.complete))
            oReq.$bind($.AJAX.On.Complete, props.complete);
        return oReq;
    },
    /** @namespace Contains definitions for AJAX requests (Objects, Enums, Constants, etc.) */
    AJAX:
    {
        /** Set to true to enable AJAX logging to the javscript console for all AJAX Requests (default = false) */
        EnableLogging: false,
        /** @namespace Enum of valid <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec5.html#sec5.1.1">HTTP Request Types</a> 
        * <br/><b>'Safe' Methods</b> <i>(No server-side effects):</i> OPTIONS | GET | HEAD | TRACE
        * <br/><b>Action Methods</b> <i>(Server/external side effects):</i> POST | PUT | DELETE | CONNECT
        */
        Req:
        {
            /** Request URI Options */
            OPTIONS: "OPTIONS",
            /** Request URI */
            GET: "GET",
            /** Request URI without body */
            HEAD: "HEAD",
            TRACE: "TRACE",

            /** Send data to server */
            POST: "POST",
            /** Store data for URI */
            PUT: "PUT",
            /** Delete data for URI */
            DELETE: "DELETE",
            CONNECT: "CONNECT"
        },
        /** @namespace Enum of type of data to request from the server for XMLHttpRequests. Pass these values as the 'Accept' header property
        */
        Accepts:
        {
            /** Allow XML as a response type
            @example application/xml, text/xml */
            xml: "application/xml, text/xml",
            /** Allow JSON as a response type
            @example application/json, text/javascript*/
            json: "application/json, text/javascript",
            /** Allow javascript/ecmascript as a response type
            @example text/javascript, application/javascript, application/ecmascript, application/x-ecmascript */
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
            /** Allow any response type, including raw text */
            all: ["*/"] + ["*"]
        },
        /** @namespace Enum for the state of the AJAX Request
        */
        State:
        {
            /** (0) The object has been created, but not initialized (the open method has not been called). */
            Uninitialized: 0,
            /** (1) The object has been created, but the send method has not been called. */
            Open: 1,
            /** (2) The send method has been called. responseText is not available. responseBody is not available. */
            Sent: 2,
            /** (3) Some data has been received. responseText is not available. responseBody is not available. */
            Receiving: 3,
            /** (4) All the data has been received. responseText is available. responseBody is available.  */
            Loaded: 4,
            /** (5) The AJAX Request has Timed Out 
            <br/><b>NOTE:</b> This is NOT an actual state per W3C Standards, but is used by jaJAX to represent a timed out request */
            Timeout: 5
        },
        /** @namespace Enum for the events fired by a {@link jQuery.AJAXRequest} object */
        On:
        {
            /** Fired when a response was received by the server */
            Success: 'ajaxsuccess',
            /** Fired when the request fails, either via invalid request, or an error from the server (ie 404) */
            Error: 'ajaxerror',
            /** Fired when a request reaches it's maximum allowed time (passed via 'maxtime' property to the {@link jQuery.AJAXRequest} construtor) and the request was canceled */
            Timeout: 'ajaxtimeout',
            /** Fired when a request has been completed, regardless of Succes, Error, or Timeout. 
            * This is always fired by all {@link jQuery.AJAXRequest} objects for which send() was called. 
            * This will not be fired until after either the {@link jQuery.AJAX.On.Success} event, {@link jQuery.AJAX.On.Error} event, or {@link jQuery.AJAX.On.Timeout} event have fired  
            */
            Complete: 'ajaxcomplete'
        }
    },
    /** @class 
    *   Creates a javascript object for sending asynchronous requests, with support for timeouts, canceling, and notifying the caller upon response or failure.
    *   <br/><b>+</b> For requests in the same domain, an XMLHttpRequest object is used, which sets the HTTP headers, POSTs any request data, monitors the ready state,
    *   and stores the raw response and HTTP Codes
    *   <br/><b>+</b> For cross-domain requests, a script tag will be appended to the document, with the request data appended to the query string. When the script loads,
    *   the data will be stored as the response, and equivalent HTTP Codes/States will be set as if using an XMLHttpRequest object
    *   @param {Object} oProps A set of key-value pairs to use in this AJAX request.
    *   @example var xhr = new jQuery.AJAXRequest({ url: '/ajax' });
    *   xhr.$bind(jQuery.AJAX.On.Success, // handler);
    *   xhr.send({ postProperty: 'value' });<br/>
    *   @example Valid properties to pass as params:
    *   <b>url</b>: Url of the request (default='')
    *   <b>header</b>: Key-value pairs (see {@link jQuery.AJAXRequest.set_headers})
    *   <b>async</b>: Make this request asynchronous (default=true)
    *   <b>maxtime</b>: Maximum time before timeout in milliseconds (default=none)
    */
    AJAXRequest: function(oProps)
    {
        oProps = oProps || {};

        this.set_url(oProps.url)
                .set_headers(oProps.header);

        this.m_fAsync = oProps.async !== false;
        this.m_iTO = $.valOrDef(oProps.maxtime, 0);

        this.m_fSent = false;
        this.m_iLatency = 0;

        // By Default, all 200's & 304 will count as success
        var arr = {};
        for (var i = $.HTTP.OK; i <= $.HTTP.PartialContent; i++)
            arr[i] = true;
        arr[$.HTTP.NotModified] = true;
        arr[$.HTTP.GatewayTimeout] = false;
        this.m_oCodeMap = arr;
    },
    /** @class 
    *   Create a well-defined object around an unknown set of JSON data, exposing basic methods for getting, setting, verifying, and iterating JSON data.
    *   If the JSON data does not exist or is malformed, this object will be empty and a call to the fromJSON() method will return false.
    *   An example for usage of this object is when using data from an AJAX call. If the call succeeds, this object would be initialized with valid data
    *   and passed to other functions. If the AJAX call fails or the data is invalid, this object could be created with null passed as the data, and default
    *   values could be manually set. The code which operates on the data can then always run even if the AJAX call fails, and if needed, can use the fromJSON()
    *   method if behavior should be different rather than having to maintain the state of the AJAX call.
    *   @param {Object} name The JSON data this jQuery.JSON object represents
    */
    JSON: function(data)
    {
        try
        {
            if ($.isString(data))
                this._props = $.parseJSON(data);
            else if (exists(data))
                this._props = data
            else
                throw new Error();
            this._isJSON = true;
        }
        catch (exc)
        {
            this._props = {};
            this._isJSON = false;
        }
    }
});

$.AJAXRequest.prototype =
/** @lends jQuery.AJAXRequest.prototype */
{
    /** Start the asynchronous HTTP (Ajax or script) request.
    * @param {String} [request=null] The data to pass via the POST body for POST's, or via the QueryString for GETs. 
    * Also can be passed as a set of key/value pairs to be converted as (prop)=(val)&amp;(prop2)=(val2)&amp;...
    * @param {jQuery.Event} [event=null] <a href="http://api.jquery.com/category/events/event-object/">jQuery.Event</a> object to store and use as the root event which triggering custom events
    * @returns {jQuery.AJAXRequest} The Plain AJAX Handler object (not jQuery wrapped)</returns>
    */
    send: function(request, event)
    {
        this._event = event || null;
        this._init(request);

        if (this.m_iTO > 0)
            this.m_oTO = setTimeout($.proxy(this._onTimeout, this), this.m_iTO);

        this.m_dtTS = new Date();
        this.m_iLatency = 0;
        this.m_fSent = true;

        if (exists(this.m_oXHR))
        {
            if ($.AJAX.EnableLogging)
                $.log('XHR.send(' + this.m_sReq + ')');
            this.m_oXHR.send(this.m_sReq);
        }
        else if (exists(this.m_elScript))
        {
            if ($.AJAX.EnableLogging)
                $.log('<head>.insertBefore(<script>, <head>.firstChild)');
            // Use insertBefore instead of appendChild  to circumvent an IE6 bug.
            // This arises when a base node is used (#2709 and #4378).
            this.m_elHead = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
            this.m_elHead.insertBefore(this.m_elScript, this.m_elHead.firstChild);
        }
        else
            this._onCompletion();

        return this;
    },
    /** Stop the AJAX request immediately. If the AJAX call has not completed, this will force the requst to stop, causing the ajaxerror event and ajaxcomplete events to fire.
    * @returns {jQuery.AJAXRequest} this
    */
    cancel: function()
    {
        if (!this.isComplete())
        {
            if (this.m_oXHR)
            {
                if ($.AJAX.EnableLogging)
                    $.log('XHR.abort()');
                this.m_oXHR.abort();
            }
            else if (this.m_elScript)
            {
                if ($.AJAX.EnableLoggin)
                    $.log('<script> -> forcing onabort event');
                this._evt_script_onabort();
            }
        }
        return this;
    },
    /** Get the AJAX response data as raw text
    * @returns {String}
    */
    getText: function() { return this.m_sText + '' },
    /** Attempt to convert the AJAX response data into a JSON object using <a href="http://api.jquery.com/jQuery.parseJSON/">jQuery.parseJSON()</a>
    * @returns {Object}
    */
    getJSON: function()
    {
        if (!exists(this.m_oJSON))
        {
            if ($.isStrVal(this.m_sText))
                this.m_oJSON = $.parseJSON(this.m_sText);
            else
                this.m_oJSON = {};
        }
        return this.m_oJSON;
    },
    /** Attempt to convert the AJAX response data into an XML Document using <a href="http://api.jquery.com/jQuery.parseXML/">jQuery.parseXML()</a>
    * @returns {XMLDocument}
    */
    getXML: function()
    {
        if (!exists(this.m_oXML))
        {
            if ($.isStrVal(this.m_sText) && this.m_sText.documentElement)
                this.m_oXML = $.parseXML(this.m_sText);
            else
                this.m_oXML = $.parseXML('');
        }
        return this.m_oXML;
    },
    /** Get the data sent in this request as a string.
    * @returns {String} String containing raw data sent/to-be-sent in this request
    */
    getRequestText: function() { return this.m_sReq },
    /** Get the data sent in this request as a set of key-value pairs.
    * @returns {Object} Map of key-value pairs sent/to-be-sent in this request
    */
    getRequestData: function() { return this.m_oReq },
    /** Get the amount of time (in milliseconds) between when this request was initiated, and the response was received.
    * @returns {Number} Time in milliseconds
    */
    getLatency: function() { return this.m_iLatency },
    /** Returns whether this AJAX request has not yet been sent, or is currently sending. A completed or timed-out request will return false.
    * @returns {Boolean}
    */
    isComplete: function() { return (this.m_fSent && this.getState() == $.AJAX.State.Loaded || this.getState() == $.AJAX.State.Timeout) },
    /** Returns whether this AJAX request completed successfully.
    * <br/><b>NOTE:</b> A request is considered successful when a response was received, and the HTTP Status code is in the 200's range, or 304.
    * @returns {Boolean}
    */
    isSuccess: function() { return (this.isComplete() && (this.m_oCodeMap[this.getStatus()])) },
    /** Returns the current state of the AJAX Request, including the custom 'timeout' state. (See values of $.AJAX.State enum or the W3C ajax specification)
    * @returns {Number} The AJAX State as a number
    */
    getState: function()
    {
        if (this.m_fTO)
            return $.AJAX.State.Timeout;
        if (this.m_oXHR)
            return this.m_oXHR.readyState;
        if (this.m_oScriptInfo)
            return this.m_oScriptInfo.state;
        return $.AJAX.State.Uninitialized;
    },
    /** Returns the current HTTP Status Code of the AJAX Request, including 502 for 'timeout' status. (See values of $.HTTP enu, or any HTTP Status Code specifications).
    * <br/><b>NOTE:</b> Status Codes 200 - 206, as well as 304 are considered successful.
    * @returns {Number} The HTTP Status Code as a number
    */
    getStatus: function()
    {
        if (this.m_fTO)
            return $.HTTP.GatewayTimeout;
        if (this.m_oXHR)
            return this.m_oXHR.status;
        if (this.m_oScriptInfo)
            return this.m_oScriptInfo.status;
        return 0;
    },
    /** Returns the status text of the AJAX Request, including 'NONE (Timeout)' for 'timeout' status.
    * @returns {String} Status Text
    */
    getStatusText: function()
    {
        if (this.m_fTO)
            return 'NONE (Timeout)';
        if (this.m_oXHR)
            return this.m_oXHR.statusText;
        if (this.m_oScriptInfo)
            return this.m_oScriptInfo.statusText;
        return '';
    },
    /** Change the target Url of this AJAX request.
    * @param {String} url The target Url to use (can be both relative or absolute)
    * @returns {jQuery.AJAXRequest} this
    */
    set_url: function(url)
    {
        // Remove hash character (jQuery #7531: and string promotion)
        this.m_oUrl = $.url(($.valOrDef(url, '') + '').replace($.AJAX._regHash, '').replace($.AJAX._regProtoPre, $.AJAX.location.protocol + '//'));
        this.m_fCrossDomain = !!(!$.AJAX.location.protocol.equals(this.m_oUrl.protocol) ||
                                             !$.AJAX.location.domain.equals(this.m_oUrl.domain) ||
                                             $.AJAX.location.port != this.m_oUrl.port);
        return this;
    },
    /** Change the request headers to be sent during non-cross domain AJAX requets. (Cross-domain requests do not use an XmlHttpRequest object, so headers cannot be sent)
    * @example <b>Example + Actual default values if not overwritten</b>:
    *  oRequest.set_headers({'X-Requested-With': 'XMLHttpRequest',
    *  'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
    *  'Accept': "application/json, text/javascript, application/xml, text/xml"
    * @param {Object} headers A set of key-value pairs to use as the header field names and values.
    * @returns {jQuery.AJAXRequest} this
    */
    set_headers: function(headers)
    {
        this.m_oHeader = $.extend({ 'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Accept': (this.m_fCrossDomain ? $.AJAX.Accepts.script : $.AJAX.Accepts.json + ', ' + $.AJAX.Accepts.xml),
            'X-Requested-With': 'XMLHttpRequest'
        }, $.valOrDef(headers, {}));
        return this;
    },

    // Internal methods
    _init: function(request)
    {
        this.m_fSent = false;
        this._clearResponse()
                        ._clearRequest()
                        ._clearTimeout()
                        ._setRequest(request);

        if (!this.m_fCrossDomain)
        {
            var oXHR = this.m_oXHR = _xhr();
            if (exists($.AJAX._refs))
                $.AJAX._refs[this.m_iRefId = $.AJAX._refId++] = oXHR;

            oXHR.onreadystatechange = $.proxy(this._evt_xhr_onreadystatechange, this);

            if ($.AJAX.EnableLogging)
                $.log('XHR.open(' + this.m_eReq + ', ' + this.m_oUrl.url + ', ' + this.m_fAsync + ')');
            oXHR.open(this.m_eReq, this.m_oUrl.url, this.m_fAsync);

            // Need an extra try/catch for cross domain requests in Firefox 3
            try
            {
                $.each(this.m_oHeader,
                                function(prop, val)
                                {
                                    if ($.isStrVal(prop) && $.isString(val))
                                    {
                                        if ($.AJAX.EnableLogging)
                                            $.log('XHR.setRequestHeader(' + prop + ', ' + val + ')');
                                        oXHR.setRequestHeader(prop, val);
                                    }
                                }
                            );
            } catch (exc) { }
        }
        else
        {
            this.m_sHolder = '_' + (this.m_sCallback = $.AJAX._jspName());
            // Define callback
            window[this.m_sCallback] = $.proxy(function(response) { window[this.m_sHolder] = [response] }, this);

            var url = this.m_oUrl.url;
            if (this.m_eReq === $.AJAX.Req.POST)
                url += (/\?/.test(url) ? '&' : '?') + this.m_sReq
            url += (/\?/.test(url) ? '&' : '?') + 'callback=' + this.m_sCallback;

            this.m_oScriptInfo = { state: $.AJAX.Uninitialized, status: $.HTTP.OK, statusText: "Unsent" };

            if ($.AJAX.EnableLogging)
                $.log('<script async="async" src="' + url + '" />');

            var elScript = this.m_elScript = document.createElement('script');
            elScript.async = 'async';
            elScript.src = url;
            elScript.onload = $.proxy(this._evt_script_onload, this);
            elScript.onerror = elScript.onabort = $.proxy(this._evt_script_onabort, this);
            elScript.onreadystatechange = $.proxy(this._evt_script_onreadystatechange, this);
        }

        return this;
    },
    _setRequest: function(request)
    {
        if (exists(request))
        {
            this.m_eReq = $.AJAX.Req.POST;
            if ($.isString(request))
                this.m_oReq = (this.m_sReq = request).doubleSplit('&', '=');
            else
                this.m_sReq = $.mapToString(this.m_oReq = request);
        }
        else
            this.m_eReq = $.AJAX.Req.GET;
    },
    _clearRequest: function()
    {
        this._handleRef();
        this.m_sReq = this.m_oReq = this.m_eReq = this.m_oXHR = this.m_elScript = this.m_oScriptInfo = this.m_sCallback = null;
        return this;
    },
    _clearResponse: function()
    {
        this.m_sText = this.m_oJSON = this.m_oXML = this.m_oScriptInfo = null;
        return this;
    },
    _clearTimeout: function()
    {
        this.m_fTO = false;
        if (exists(this.m_oTO))
            clearTimeout(this.m_oTO);
        this.m_oTO = null;
        return this;
    },
    _checkComplete: function(oEvt)
    {
        if (this.isComplete())
        {
            if (!this.m_fTO)
                this._clearTimeout();
            this._event = $.event.fix(oEvt);
            this._onCompletion();
        }
    },
    _onCompletion: function()
    {
        this.m_iLatency = new Date() - this.m_dtTS;
        var logStr = '(' + this.m_iLatency + 'ms) ';

        if (exists(this.m_oXHR))
        {
            try { this.m_sText = this.m_oXHR.responseText }
            catch (exc)
            {
                try { this.m_sText = this.m_oXHR.responseXML }
                catch (exc2) { this.m_sText = '' }
            }
            this._handleRef();

            if ($.AJAX.EnableLogging && $.isString(this.m_sText))
            {
                if (this.m_sText.length < 100)
                    logStr += this.m_sText;
                else
                    logStr += this.m_sText.substring(0, 100) + '...';
            }
        }
        else if (exists(this.m_elScript))
        {
            if ($.isElement(this.m_elHead) && $.isElement(this.m_elScript))
            {
                this.m_elScript.onload = this.m_elScript.onabort = this.m_elScript.onerror = this.m_elScript.onreadystatechange = null;
                this.m_elHead.removeChild(this.m_elScript);
                this.m_elScript = undefined;
                this.m_elHead = undefined;
            }
            this.m_oScriptInfo.state = $.AJAX.State.Loaded;

            if (exists(window[this.m_sHolder]))
            {
                if ($.isString(window[this.m_sHolder][0]))
                    this.m_sText = window[this.m_sHolder][0];
                else
                    this.m_oJSON = window[this.m_sHolder][0];
                window[this.m_sHolder] = undefined;
            }
            if (exists(window[this.m_sCallback]))
                window[this.m_sCallback] = null;

            if ($.AJAX.EnableLogging)
            {
                if ($.isStrVal(this.m_sText))
                {
                    if (this.m_sScript.length < 100)
                        logStr += this.m_sScript;
                    else
                        logStr += this.m_sScript.substring(0, 100) + '...';
                }
                else if (exists(this.m_oJSON))
                {
                    logStr += 'JSON';
                }
            }
        }

        if (this.isSuccess())
        {
            if ($.AJAX.EnableLogging)
                $.log('AJAX RESPONSE: ' + logStr);
            $(this).customEvent($.AJAX.On.Success, this._event).trigger();
        }
        else if (this.m_fTO)
        {
            if ($.AJAX.EnableLogging)
                $.log('AJAX TIMEOUT: ' + logStr);
            $(this).customEvent($.AJAX.On.Timeout, this._event).trigger();
        }
        else
        {
            if ($.AJAX.EnableLogging)
                $.log('AJAX (Failure) RESPONSE: ' + logStr);
            $(this).customEvent($.AJAX.On.Error, this._event).trigger();
        }
        $(this).customEvent($.AJAX.On.Complete, this._event).trigger();

        return this;
    },
    _onTimeout: function()
    {
        this.m_oTO = null;
        this.m_fTO = true;
        this.cancel();
        return this;
    },
    _handleRef: function()
    {
        if (exists(this.m_iRefId))
        {
            $.AJAX._clearRef(this.m_iRefId);
            this.m_iRefId = undefined;
        }
    },

    // XHR + Script event handling
    _evt_script_onload: function(oEvt)
    {
        if ($.AJAX.EnabledLogging)
            $.log('<script> onload');
        this.m_oScriptInfo = { state: $.AJAX.State.Loaded, status: $.HTTP.OK, statusText: "Loaded" };
        this._onCompletion();
    },
    _evt_script_onabort: function(oEvt)
    {
        if ($.AJAX.EnabledLogging)
            $.log('<script> onabort');
        this.m_oScriptInfo = { state: $.AJAX.State.Loaded, status: $.HTTP.NotFound, statusText: "Abort" };
        this._onCompletion();
    },
    _evt_script_onreadystatechange: function(oEvt)
    {
        if ($.AJAX.EnabledLogging)
            $.log('<script> readyState:' + this.m_elScript.readyState);

        if ($.isString(this.m_elScript.readyState) && /loaded|complete/.test(this.m_elScript.readyState))
            this.m_oScriptInfo = { state: $.AJAX.State.Loaded, status: $.HTTP.OK, statusText: "Ready" };
        else
            this.m_oScriptInfo = { state: $.AJAX.State.Receiving, status: $.HTTP.OK, statusText: "Waiting" };

        this._checkComplete(oEvt);
    },
    _evt_xhr_onreadystatechange: function(oEvt)
    {
        if ($.AJAX.EnableLogging)
        {
            var logStr = 'XHR readyState:' + this.m_oXHR.readyState + ' | status:';
            try { logStr += this.m_oXHR.status; }
            catch (exc) { logStr += 'INVALID'; }
            logStr += ' | statusText:';
            try { logStr += this.m_oXHR.statusText; }
            catch (exc) { logStr += '(none)'; }
            $.log(logStr);
        }
        this._checkComplete(oEvt);
    }
}

$.JSON.prototype =
/** @lends jQuery.JSON.prototype */
{
    /** Returns whether the JSON data used to initialize this jQuery.JSON object had valid data
    * @returns {Boolean}
    */
    fromJSON: function() { return this._isJSON },
    /** Returns whether this JSON data contains a specific value. (NOTE: This will return false for undefined, null, or an empty string)
    *   @param {String} eName The property to check for existence
    *   @returns {Boolean}
    */
    hasValue: function(eName) { return ($.arrExists(this._props, eName) && !(this._props[eName] === "")) },
    /** Returns the value of a property if it exists, otherwise return an empty string
    *   @param {String} eName The name of the property to retrieve
    *   @returns {String} The value of the property or an empty string
    */
    get: function(eName)
    {
        if (!exists(this._props[eName]))
            return '';
        return this._props[eName];
    },
    /** Manually sets the value of a property
    *   @param {String} eName The name of the property to set
    *   @param {*} oValue The value of the property to set
    *   @returns {jQuery.JSON} this
    */
    set: function(eName, oValue)
    {
        this._props[eName] = ((oValue === "") ? null : oValue);
        return this;
    },
    /** Iterates over all the properties of the internal data using a <a href="http://api.jquery.com/jQuery.each/">jQuery.each()</a> loop.
    *   <br/>The parameters passed to this method should be the same as those passed to a jQuery.each() loop, except for the first parameter
    *   @returns The return value of the <a href="http://api.jquery.com/jQuery.each/">jQuery.each()</a> loop
    */
    each: function()
    {
        var arr = [this._props];
        return $.each.apply($, Array.prototype.concat.apply(arr, arguments));
    }
}

$.extend($,
/** @lends jQuery */
{
    /** @namespace Contains all valid <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html">HTTP Status Codes</a> */
    HTTP:
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
});

var _xhr = function()
{
    /// <summary>
    ///     Creates a native XmlHttpRequest object, or IE equivalent ActiveXObject for older IE browsers
    /// </summary>
    /// <returns type="XMLHttpRequest" />
    if (exists(_xhr.variantIndex))
        return _xhr.variants[_xhr.variantIndex]();
    if (!exists(_xhr.variants))
    {
        _xhr.variants = [
                                   function() { return new XMLHttpRequest() },
                                   function() { return new ActiveXObject("Msxml2.XMLHTTP") },
                                   function() { return new ActiveXObject("Msxml3.XMLHTTP") },
                                   function() { return new ActiveXObject("Microsoft.XMLHTTP") }
                                  ];
    }
    var oXHR = null;
    $.each(_xhr.variants,
                function(idx, fn)
                {
                    try { oXHR = fn() } catch (exc) { return true; }
                    _xhr.variantIndex = idx;
                    if (idx > 0)
                    {
                        $.AJAX._refs = {};
                        jQuery(window).unload(
                            function(evt)
                            {
                                $.each($.AJAX._refs,
                                    function(refId, ref) { $.AJAX._clearRef(refId) }
                                );
                            }
                        );
                    }
                    return false;
                }
            );
    return oXHR;
}

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try
{
    $.AJAX.location = $.url(window.location.href);
} catch (e)
{
    // Use the href attribute of an A element
    // since IE will modify it given document.location
    var ajaxLocation = document.createElement("a");
    ajaxLocation.href = "";
    $.AJAX.location = $.url(ajaxLocation.href);
}

// Internal Vars
jQuery.extend($.AJAX,
{
    _regProtoPre: new RegExp('^\/\/'),
    _regHash: new RegExp('#.*$'),
    _refs: null,
    _refId: 1,
    _clearRef: function(refId)
    {
        if (exists($.AJAX._refs) && exists($.AJAX._refs[refId]))
        {
            $.AJAX._refs[refId].onreadystatechange = function() { };
            delete $.AJAX._refs[refId];
        }
    },
    _jspSeed: $.now(),
    _jspName: function() { return $._jaexpando + "_" + ($.AJAX._jspSeed++) },
    _isLocal: new RegExp('^(?:about|app|app\-storage|.+\-extension|file|res|widget):$').test($.AJAX.location.protocol)
});

})(jQuery);