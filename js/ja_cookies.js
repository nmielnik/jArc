/// <reference path="ja_core.js" />

(function($)
{
    $.extend($,
    /** @lends jQuery */
    {
        /** @namespace Namespace for Cookie support functionality */
        CK:
        {
            /** Extendable Enum for containing saved cookie names */
            Name: {},
            /** Configurable Date string used for expired Cookies */
            ExpireDateString: 'Thu, 2 Aug 2001 20:47:11 UTC',
            /** Configurable Date string used for persisted Cookies */
            PersistDateString: 'Sun, 4 Nov 2037 10:31:15 UTC',
            /** Return whether cookies are current enabled for this user's browser
            *  @returns {Boolean}
            */
            isEnabled: function()
            {
                var sCookie = 'jaCKTst=ja' + new Date().getTime();

                document.cookie = sCookie;
                return (document.cookie.find(sCookie) != -1);
            },
            /** Writes a cookie to the user's cookie jar.
            *   <br/>+ Persistent cookies will have an expiration in 2037.
            *   <br/>+ Blank cookies will be assumed to be cookie deletes, and will expire in the past.
            *   @param {String} name The name of the cookie
            *   @param {String} value The value of the cookie
            *   @param {Boolean} [persist=false] Make the cookie persistant beyond this sessions
            *   @param {String} [domain=null] Specific domain to write the cookie to
            */
            write: function(name, value, persist, domain)
            {
                if (!persist && $.isStrVal(value, true))
                    $.CK.remove(name);
                else
                {
                    var sExp = persist ? ('; expires=' + $.CK.PersistDateString) : '';
                    sExp += $.isStrVal(domain) ? ('; domain=' + domain) : '';
                    document.cookie = ('{0}={1}'.format(name, value) + sExp + '; path=/');
                }
            },
            /** Removes a cookie and its value
            *  @param {String} name The name of the cookie
            */
            remove: function(name) { document.cookie = (name + '= ;path=/; expires=' + $.CK.ExpireDateString) },
            /** Get the value of a cookie
            *  @param {String} name The name of the cookie to retrieve a value for
            *  @returns {String} The value of the cookie, or null if it does not exists
            */
            "get": function(name)
            {
                var oCookies = document.cookie.doubleSplit('; ', '=');
                if (exists(oCookies[name]))
                    return oCookies[name];
                return null;
            },
            /** Get the vaue of a cookie dictionary as a set of key-value pairs
            *  @param {String} name The name of the cookie to retrieve a value for
            *  @param {String} [first='&'] The string which separates each node of the map
            *  @param {String} [second='='] The string which separates each key-value pair in the map
            *  @returns {Object} A set of key-value pairs resulting from calling doubleSpit on the cookie value
            */
            getMap: function(name, first, second) { return ($.CK.get(name) || '').doubleSplit($.valOrDef(first, '&'), $.valOrDef(second, '=')) }
        }
});
})(jQuery);