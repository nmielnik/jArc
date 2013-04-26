/// <reference path="ja_core.js" />

(function($)
{
    $.extend($,
    /** @lends jQuery */
{
/**
*  @namespace Holds Constants and functions related to Day Names
*/
Day:
    {
        /**
        *  A map of day number (0-6) to day names (ie 'Monday')
        *  @example jQuery.Day.Names[3] // 'Tuesday'
        */
        Names: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        /**
        *  A map of day number (0-6) to abbreviated day name (ie 'Mon')
        *  @example jQuery.Day.ShortNames[0] // 'Sun'
        */
        ShortNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        /**
        *  Converts a day name or abberviated day name to its corresponding index (0-6)
        *  @param {String} sName Day name
        *  @example $.Day.toNumber('Monday') // 1
        */
        toNumber: function(sName)
        {
            for (var i = 0; i < $.Day.Names.length; i++)
            {
                if ($.Day.Names[i].equals(sName, true) || $.Day.ShortNames[i].equals(sName, true))
                    return i;
            }
            return null;
        }
    },

/**
@namespace Holds Constants and functions related to Month Names
*/
Month:
    {
        /**
        *   A map of month number (0-11) to month names (ie 'January')
        *   @example jQuery.Month.Names[3] // 'April'
        */
        Names: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        /**
        *   A map of month number (0-11) to abbreviated month name (ie 'Jun')
        *   @example jQuery.Month.ShortNames[0] // 'Jan'
        */
        ShortNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        /**
        *  Converts a month name or abberviated month name to its corresponding index (0-11)
        *  @param {String} sName Month name
        *  @example $.Month.toNumber('December') // 11
        */
        toNumber: function(sName)
        {
            for (var i = 0; i < $.Month.Names.length; i++)
            {
                if ($.Month.Names[i].equals(sName, true) || $.Month.ShortNames[i].equals(sName, true))
                    return i;
            }
            return null;
        }
    },

/**
@namespace Holds Constants and functions related to Time and Timezones
*/
Time:
    {
        /**
        *   An Array of all acceptible strings representing the UTC Timezone
        *   @example 'UTC', 'Z', 'GMT', '-00:00', etc.
        */
        UTCTimezoneNames: ['UT', 'UTC', 'GMT', 'Z', '-0000', '+0000', '-00:00', '+00:00', '-00', '+00'],
        /** The default String representing the UTC Timezone for non-ISO-8601 based date formats */
        UTCName: 'GMT',
        /** The default String representing the UTC Timezone for ISO-8601 date formats */
        UTCNameISO: 'Z',
        /**
        *   A map of known timezone abbreviations (ie 'EST') to their corresponding timezone offset in minutes (ie 240)
        *   @example jQuery.Time.TimezoneOffset['PST'] // 480
        */
        TimezoneOffsets: { 'EDT': 240, 'EST': 300, 'CDT': 300, 'CST': 360, 'MDT': 360, 'MST': 420, 'PDT': 420, 'PST': 480 },
        /**
        *   A map of timezone offsets, to their non-daylight savings time timezone abbreviation
        *   @example jQuery.Time.StandardTimezones[420] // 'MST'
        */
        StandardTimezones: [],
        /**
        *   A map of timezone offsets, to their daylight savings time timezone abbreviation
        *   @example jQuery.Time.DaylighSavingsTimezones[420] // 'PDT'
        */
        DaylightSavingsTimezones: [],
        /**
        *   Returns whether the given string is a valid representation/alias of the UTC Timezone
        *   @param {String} name String to check
        *   @returns {Boolean}
        */
        IsUTCTimezone: function(name)
        {
            for (var i = 0; i < $.Time.UTCTimezoneNames.length; i++)
            {
                if ($.Time.UTCTimezoneNames[i].equals(name))
                    return true;
            }
            return false;
        },
        /**
        *   A native javascript Date object, initialized to the UTC epoch, in local time
        *   <br/><b>NOTE:</b> This will be initialized to Year 0, Month 0, Date 1 at 0:0:0.0 in UTC Time only.
        *   Unless the user's locale is in the UTC Timezone, the values of getDate(), getHours(), and/or getMinutes() may vary depending on the timezone
        */
        epoch: new Date(0),
        /** Number of javascript ticks (milliseconds) in a week */
        TicksPerWeek: 0,
        /** Number of javascript ticks (milliseconds) in a day */
        TicksPerDay: 0,
        /** Number of javascript ticks (milliseconds) in an hour */
        TicksPerHour: 0,
        /** Number of javascript ticks (milliseconds) in a minute */
        TicksPerMinute: 0,
        /** Number of javascript ticks (milliseconds) in a second */
        TicksPerSecond: 0
    }
});

    // Define $.Day.Sunday, Monday, ..., Saturday
    $.each($.Day.Names, function(idx, name) { $.Day[name] = idx });

    // Define $.Month.January, February, ..., December
    $.each($.Month.Names, function(idx, name) { $.Month[name] = idx });

    // Define Standard + Daylight Savings Timezones by Offset
    $.each($.Time.TimezoneOffsets,
    function(name, val)
    {
        if (name.match(/DT$/))
            $.Time.DaylightSavingsTimezones[val] = name;
        else
            $.Time.StandardTimezones[val] = name;
    }
);

    // Add UTC Timezones to TimezoneOffsets
    $.each($.Time.UTCTimezoneNames, function(idx, name) { $.Time.TimezoneOffsets[name] = 0 });
    // Define $.Time.TicksPerWeek, Day, Hour, Minute + Second
    $.Time.TicksPerWeek = (7 * ($.Time.TicksPerDay = (24 * ($.Time.TicksPerHour = (60 * ($.Time.TicksPerMinute = (60 * ($.Time.TicksPerSecond = 1000))))))));

    /** Create a copy of a Date object
    @returns {Date} A copy of this Date */
    Date.prototype.clone = function() { return new Date(this.getTime()) }
    /** Checks if this Date represents the same point in time as another Date 
    * @param {Date} date Date to check for equality
    * @returns {Boolean} TRUE if these dates are equivalent
    */
    Date.prototype.equals = function(date) { return +this == +date }

    /** Create a new DateTime object representing a specific point in time. The constructor has several overrides, including passing no arguments which initializes the DateTime
    * to the current Date and Time (the same behavior as the native javascript Date object)
    * @param {Number|String|Date|DateTime} [year=null] Either the total milliseconds from {@link jQuery.Time.epoc} in UTC time, a {@link Date} or a {@link DateTime} to copy, or the Full Year value.
    * @param {Number} [month=now] The 0-based month of this DateTime. 
    * <br/><b>NOTE:</b> If month is passed, the date parameter is required.
    * @param {Number} [date=now] The 1-based date of the month
    * @param {Number} [hours=now] The hour-of-day of this DateTime, in a 24-hour clock
    * @param {Number} [minutes=now] The minute-of-hour of this DateTime
    * @param {Number} [seconds=now] The seconds-of-minute of this DateTime
    * @param {Number} [milliseconds=now] The thousandths-of-a-second of this DateTime
    * @example // Now (this instant in time)
    * DateTime()
    * @example // A specified number of milliseconds from the epoch
    * DateTime(946713600000); // Jan 1st 2000 (UTC Time)
    * DateTime('0'); // Jan 1 1970 (UTC Time)
    * @example // A copy of another DateTime or Date object
    * DateTime([Date/DateTime object]);
    * @example // A specified date
    * DateTime(2000, 0, 1); // Jan 1 2000 12:00:00 AM (local time)
    * @example // A specified date + time
    * DateTime(1999, 11, 31, 23, 59, 59, 999); // 1/1/2000 11:59:59.999 PM (local time)
    * @class
    * An object which derives from the native javascript Date object, which accepts the same constructor arguments as a Date as well as exposes the same method definitions as a Date.
    * However, a DateTime object also:
    * <br/><b>+</b> Returns a reference of itself on setter calls to allow for chaining. (ie date.setHours(1).setMinutes(2).setSeconds(3)...
    * <br/><b>+</b> Along with the TimeSpan object, DateTime's have support for additional arithmetic. Methods such as add(), subtract(), plus(), minus(), etc. allow for more useful
    * operations on one or more DateTimes
    * <br/><b>+</b> DateTime has some of the most complete formatting and parsing support of anything in the internet. This includes built in support for parsing/formatting dates and/or times
    * in <b><u>30+</u></b> established internet and software standards, including ISO8601 and RFC850/RFC822 derived standards.
    * @augments Date
    */
    DateTime = function(year, month, date, hours, minutes, seconds, milliseconds)
    {
        if (!exists(year))
            this._date = new Date();
        else if (exists(year) && year instanceof Date)
            this._date = year.clone();
        else if (exists(year) && exists(year._date))
            this._date = new Date(+year);
        else if (!exists(month))
            this._date = new Date($.isString(year) && $.isNumeric(year) ? Number(year) : year);
        else if (!exists(hours))
            this._date = new Date(year, month, date);
        else if (!exists(minutes))
            this._date = new Date(year, month, date, hours);
        else if (!exists(seconds))
            this._date = new Date(year, month, date, hours, minutes);
        else if (!exists(milliseconds))
            this._date = new Date(year, month, date, hours, minutes, seconds);
        else
            this._date = new Date(year, month, date, hours, minutes, seconds, milliseconds);
    }
    DateTime.prototype =
{
    /** Clear the time portion of this DateTime (Note, consider using a {@link DateObj} instead.
    @returns {DateTime} this */
    clearTime: function() { return this.setHours(0, 0, 0, 0) },
    /** Create a copy of this DateTime
    @returns {DateTime} A copy of this DateTime */
    clone: function() { return new this.constructor(+this) },
    /** Create a javascript Date object equivalent to this point in time
    @returns {Date} A copy of this via a javascript Date object */
    nativeDate: function() { return new Date(+this) },
    /** Compares this and another DateTime for equality
    * @param {DateTime} date The DateTime to compare this to
    * @returns {Boolean} TRUE if these DateTime's are equivalent 
    */
    equals: function(date) { return +this == +date },
    /** Moves this DateTime a certain amount of time forward, represented by a {@link TimeSpan}, another {@link DateTime}, a javascript Date object, or a number of milliseconds
    * @param {TimeSpan|DateTime|Date|Number} timespan Represents the amount of time to move this DateTime forwards
    * @returns {DateTime} this
    */
    add: function(timespan) { this._date.setTime(this + timespan); return this },
    /** Moves this DateTime a certain amount of time backwards, represented by a (@link TimeSpan}, another {@link DateTime}, a javascript Date object, or a number of milliseconds
    * @param {TimeSpan|DateTime|Date|Number} timespan Represents the amount of time to move this DateTime backwards
    * @returns {DateTime} this
    */
    subtract: function(timespan) { this._date.setTime(this - timespan); return this },
    /** Creates a new DateTime, a specified amount of time greater than this DateTime
    * @param {TimeSpan|DateTime|Date|Number} timespan Represents the amount of time difference between this DateTime and the new one to create
    * @returns {DateTime} A new DateTime
    */
    plus: function(timespan) { return this.clone().add(timespan) },
    /** Creates a new DateTime, a specified amount of time less than this DateTime
    * @param {TimeSpan|DateTime|Date|Number} timespan Represents the amount of time difference between this DateTime and the new one to create
    * @returns {DateTime} A new DateTime
    */
    minus: function(timespan) { return this.clone().subtract(timespan) },
    /** Creates a new {@link TimeSpan} containing the amount of time seperating this and another DateTime
    * @param {DateTime|DateObb|Date} datetime Another representation of a point in time to compare to this DateTime
    * @returns {TimeSpan} A new TimeSpan
    */
    diff: function(datetime) { return new TimeSpan(Math.abs(this - datetime)) },
    /** Returns whether this DateTime falls in Daylight Savings Time for the local timezone
    @returns {Boolean} TRUE If this DateTime is during Daylight Savings Time for the local timezone */
    isDST: function()
    {
        var one = new DateTime(this.getFullYear(), 0, 1).getTimezoneOffsetHours();
        var two = new DateTime(this.getFullYear(), 6, 1).getTimezoneOffsetHours();
        var off = this.getTimezoneOffsetHours();
        return (off == one && one < two) || (off == two && two < one)
    },
    /** Returns the number of full hours between this DateTime and the UTC Timezone
    @ returns {Number} Number of full hours */
    getTimezoneOffsetHours: function() { return Math.floor(this._date.getTimezoneOffset() / 60) },
    /** Adjusts this DateTime to be the same time as this, but in a different timezone.
    * <br/><b>NOTE:</b> Using this method is generally not recommended, since any change to the hour or minute of this DateTime will override anything done by this method.
    * <br/><b>NOTE:</b> A DateTime will always be in the user's local timezone. This method will not change timezones.
    * @param {Number} minutes The timezone offset (in minutes) of the target timezone.
    * @example Assume the user's local timezone is EST
    * var dt = new DateTime(1970,0,1,12); // Jan 1 1970, 12:00:00 PM
    * dt.setTimezoneOffset(0); // Jan 1 1970, 8:00:00 AM
    * @returns {DateTime} this
    */
    setTimezoneOffset: function(minutes)
    {
        var minDiff = this.getTimezoneOffset() - minutes;
        if (minDiff > 0)
            this.subtract(TimeSpan.fromMinutes(minDiff));
        else if (minDiff < 0)
            this.add(TimeSpan.fromMinutes(Math.abs(minDiff)));
        return this;
    },
    /** Get the AM/PM value of this DateTime
    @returns {String} AM or PM */
    getMeridiem: function() { return this._date.getHours() < 12 ? 'AM' : 'PM' },
    /** Changes the meridiem value of this DateTime (AM/PM). This will not change the local date of this DateTime, but could affect the date for other timezones.
    * @param {String} val 'AM' or 'PM'
    * @example Assume the user's local time is EST
    * var dt = new DateTime(1970,0,1,23,59); // Jan 1 1970 11:59 PM
    * dt.setMeridiem('AM'); // Jan 1 1970 11:59 AM
    * <b>NOTE:</b> the date locally was unchanged, but for UTC the date
    * would have changed from Jan 2 1970 to Jan 1 1970.
    * @returns {DateTime} this
    */
    setMeridiem: function(val)
    {
        if (!this.getMeridiem().equals(val, true))
            this._date.setHours(this._date.getHours() + ('PM'.equals(val, true) ? 12 : ('AM'.equals(val, true) ? -12 : 0)));
        return this;
    },
    /** Get the day number this DateTime represents in respect to the current year.
    * @example var dt = new DateTime(1970,0,1); // Jan 1 1970
    * dt.getDayOfYear(); // 1
    * dt.subtract(TimeSpan.FromDays(1)); // Dec 31 1969
    * dt.getDayOfYear(); // 365
    * @returns {Number} The day number in respect to the year
    */
    getDayOfYear: function()
    {
        return this.clone()
            .clearTime()
            .diff(this.clone()
                .clearTime()
                .setFullYear(this.getFullYear(), 0, 1))
            .divideBy(TimeSpan.fromDays(1)) + 1
    },
    /** Move this DateTime to a specific day number in respect to its current year
    * <br/><b>NOTE:</b> The year must be set before this is called. Changing the year/month/date will override anything done by this method
    * @param {Number} val A value between 1-366 for the current year, or other numbers to move to other years.
    * <br/>Passing <b><i>0</i></b> moves this to the last day of the previous years
    * <br/>Passing <b><i>366</i></b> moves this to either the first day of the next year, or the last day of this year (leap year)
    * @returns {DateTime} this
    */
    setDayOfYear: function(val)
    {
        var dayDiff = val - this.getDayOfYear();
        return (dayDiff > 0) ? this.add(TimeSpan.fromDays(dayDiff)) : (dayDiff < 0 ? this.subtract(TimeSpan.fromDays(Math.abs(dayDiff))) : this);
    },
    /** Get <a href="http://en.wikipedia.org/wiki/ISO_week_date">The ISO Week</a> number that this DateTIme falls in. This may or may not be a week in the current year.
    * @example var dt = new DateTime(2012,0,1); // Jan 1 2012
    * dt.getWeekOfYear(); // 1
    * dt.SetFullYear(2011).getWeekOfYear(); // 52
    * @returns {Number} <a href="http://en.wikipedia.org/wiki/ISO_week_date">The ISO Week</a> number
    */
    getWeekOfYear: function()
    {
        var firstDay = this.clone()
            .clearTime()
            .setFullYear(this.getFullYear(), 0, 1)
            .moveToDay($.Day.Thursday);
        firstDay.moveToDay($.Day.Monday, true, firstDay.getDate() >= 4);
        if (this.getDate() < firstDay.getDate())
            return 0;
        var currMon = this.clone()
            .clearTime()
            .moveToDay($.Day.Monday, false, true);
        return (firstDay.diff(currMon).divideBy(TimeSpan.fromWeeks(1))) + 1;
    },
    /** Move this DateTime to the same day-of-week of specific Week of the current year. 
    * <br/><b>NOTE:</b> The year and either date or day-of-week must be set before this is called. Changing year/month/date will override anything done by this method
    * @param {Number} val A value between 1-52 for the current year, or other numbers to move to other years.
    * <br/>Passing <b><i>0</i></b> moves this to the last week of the previous year
    * <br/>Passing <b><i>53</i></b> moves this to the first week of the next year.
    * @returns {DateTime} this
    */
    setWeekOfYear: function(val)
    {
        var weekDiff = val - this.getWeekOfYear();
        return (weekDiff > 0) ? this.add(TimeSpan.fromWeeks(weekDiff)) : (weekDiff < 0 ? this.subtract(TimeSpan.fromWeeks(Math.abs(weekDiff))) : this);
    },
    /** Move this DateTime a specified number of months (forward or backward) while keeping the same day-of-month (if possible)
    * <br/><b>NOTE:</b> This will ensure the the month value increases by only the specified amount, but the day-of-month may change (see examples)
    * @param {Number} months Number of +- months to move this DateTime
    * @example var dt = new DateTime(2000,0,31); // Jan 31 2000
    * dt.addMonths(2); // Mar 31 2000
    * dt.addMonths(-1); // Feb 29 2000
    * @returns {DateTime} this
    */
    addMonths: function(months)
    {
        var tgt = (this.getMonth() + months) % 11;
        this._date.setFullYear(this._date.getFullYear(), this._date.getMonth() + $.numOrZero(months));
        if (this.getMonth() > tgt)
            this.add(TimeSpan.fromDays(this.getDate()));
        return this;
    },
    /** Move this DateTime a specified number of years (forward or backward) while keeping the same Date (if possible)
    * <br/><b>NOTE:</b> This will ensure the year value increases by only the specified amount, but the date my change (see examples)
    * @param {Number} years Number of +- years to move this DateTime
    * @example var dt = new DateTime(2000,1,29); // Feb 29 2000
    * dt.addYears(2); // Feb 28 2002
    * dt.addYears(-2); // Feb 28 2000
    * @returns {DateTime} this
    */
    addYears: function(years) { return this.addMonths(years * 12) },
    /** Move this DateTime to a specific day-of-week. By default, this will move the DateTime to the nearest day-of-week in the future, unless it is already on the specified day.
    * @param {Number} day A value between 0-6 representing the day of the week to move to.
    * @param {Boolean} [force=false] Move the DateTime even if it is already on the specified day-of-week
    * @param {Boolean} [backwards=false] Move the DateTime backwards to the nearest day-of-week in the past.
    * @returns {DateTime} this
    */
    moveToDay: function(day, force, backwards)
    {
        if ($.isNumeric(day))
        {
            day = Math.round(day % 6);
            var incr = TimeSpan.fromDays(backwards ? -1 : 1);
            if (force)
                this.add(incr);
            while (this.getDay() != day)
                this.add(incr);
        }
        return this;
    },
    toString: function(format)
    {
        if (!$.isStrVal(format))
            return this._date.toString();
        var str;
        switch (format)
        {
            // ISO 8601 Format
            case 'u': str = this.format(DateTime.Formats.ISO_DotNet);
                break;
            // ISO 8601 Format w/o Timezone
            case 'U': str = this.format(DateTime.Formats.ISO_DotNet_Local);
                break;
            // Standard Sortable Format
            case 's': str = this.format(DateTime.Formats.Sortable);
                break;
            // Universal Sortable Format
            case 'S': str = this.format(DateTime.Formats.USortable);
                break;
            // .NET Standard
            case 'o':
            case 'O': str = this.format(DateTime.Formats.DotNet);
                break;
            // Javascript 'JSON' Format (OK)
            case 'j':
            case 'J': str = this.toJSON();
                break;
            // Javascript 'ISO' Format (OK)
            case 'i':
            case 'I': str = this.toISOString();
                break;
            // RFC1123 Format (IE Different)
            case 'r':
            case 'R': str = this._date.toUTCString();
                break;
            // Short Date String (OK)
            case 'd': str = this._date.toDateString();
                break;
            // Culture-Based Long Date String (OK)
            case 'D': str = this._date.toLocaleDateString();
                break;
            // Short Time String (IE Different)
            case 't': str = this._date.toTimeString();
                break;
            // Culture-Based Long Time String (Chrome + Safari) vs (IE + Firefox)
            case 'T': str = this._date.toLocaleTimeString();
                break;
            // Culture-Based Full String (Chrome Different)
            case 'l':
            case 'L': str = this._date.toLocaleString();
                break;
            // (IE Different)
            default: str = this._date.toString();
                break;
        }
        return str;
    },
    format: function(format)
    {
        if (!exists(_dtfCache[format]))
            _dtfCache[format] = new DateTimeFormatter(format);
        return _dtfCache[format].format(this);
    },

    // Low-Level Date Overrides
    valueOf: function() { return this._date.valueOf() },
    toJSON: function()
    {
        if (exists(this._date.toJSON))
            return this._date.toJSON();
        return this.toISOString();
    },
    toISOString: function()
    {
        if (exists(this._date.toISOString))
            return this._date.toISOString();
        return this.format(DateTime.Formats.ISO_JSON);
    }
}
DateTime.prototype.constructor = DateTime;
DateTime.parse = function(toParse, format)
{
    if (!exists(_dtfCache[format]))
        _dtfCache[format] = new DateTimeFormatter(format);
    return _dtfCache[format].parse(toParse);
}
DateTime.format = function(date, format) { return (date instanceof DateTime) ? date.format(format) : (new DateTime(date)).format(format) }

function _addDTSetters(arrNames)
{
    $.each(arrNames,
    function(_, name)
    {
        if (exists(Date.prototype[name]))
            DateTime.prototype[name] = function() { this._date[name].apply(this._date, arguments); return this }
    }
);
}
function _addDTGetters(arrNames)
{
    $.each(arrNames,
    function(_, name)
    {
        if (exists(Date.prototype[name]))
            DateTime.prototype[name] = function() { return this._date[name]() }
    }
);
}
_addDTSetters('setFullYear setMonth setDate setUTCFullYear setUTCMonth setUTCDate'.split(' '));
_addDTGetters('getFullYear getMonth getDate getDay getUTCFullYear getUTCMonth getUTCDate getUTCDay toDateString toLocaleDateString toLocaleString toUTCString'.split(' '));

/** Creates a new instance of a DateObj
* @param {Number|String|Date|DateTime|DateObj} [year=now] Either the total milliseconds from {@link jQuery.Time.epoc} in UTC time, a {@link Date} / {@link DateTime} / DateObj to copy, or the Full Year value.
* <br/><b>NOTE:</b>If passing total milliseconds since {@link jQuery.Time.epoc}, only the amount of full days will be used and any remained discarded.
* @param {Number} [month=now] The 0-based month. <b>NOTE:</b> If this param is passed, day is required.
* @param {Number} [day=now] The 1-based day of the month.
* @class
* Equivalent to a {@link DateTime} but without any support for modifying Time properties. All DateObj instances will be initialized to the same time relevant to a specific date.
* @augments DateTime
*/
DateObj = function(year, month, day)
{
    if ($.isNumeric(day))
        DateTime.apply(this, [year, month, day]);
    else if (exists(year))
        DateTime.apply(this, [year]);
    else
        DateTime.apply(this, []);
    this.clearTime();
}
DateObj.derivesFrom(DateTime);

_addDTSetters('setHours setMinutes setSeconds setMilliseconds setUTCHours setUTCMinutes setUTCSeconds setUTCMilliseconds setTime'.split(' '));
_addDTGetters('getHours getMinutes getSeconds getMilliseconds getUTCHours getUTCMinutes getUTCSeconds getUTCMilliseconds getTime getTimezoneOffset toTimeString toLocaleTimeString'.split(' '));

/** @class */
TimeSpan = function(milliseconds, seconds, minutes, hours, days, weeks)
{
    if (!exists(milliseconds))
        this._date = $.Time.epoch.clone();
    else if (milliseconds instanceof Date)
        this._date = milliseconds.clone();
    else if (milliseconds._date instanceof Date)
        this._date = milliseconds._date.clone();
    else
    {
        this._date = $.Time.epoch.clone();
        if (exists(weeks) || exists(days))
            this._date.setUTCFullYear(this._date.getUTCFullYear(), this._date.getUTCMonth(), this._date.getUTCDate() + (7 * $.numOrZero(weeks)) + $.numOrZero(days));
        this._date.setUTCHours($.numOrZero(hours), $.numOrZero(minutes), $.numOrZero(seconds), $.numOrZero(milliseconds));
    }
}
TimeSpan.prototype =
{
    divideBy: function(timespan) { return Math.floor(this / timespan) },
    valueOf: function() { return this._date.getTime() }
}
TimeSpan.fromSeconds = function(seconds) { return new TimeSpan($.Time.TicksPerSecond * $.numOrZero(seconds)) }
TimeSpan.fromMinutes = function(minutes) { return new TimeSpan($.Time.TicksPerMinute * $.numOrZero(minutes)) }
TimeSpan.fromHours = function(hours) { return new TimeSpan($.Time.TicksPerHour * $.numOrZero(hours)) }
TimeSpan.fromDays = function(days) { return new TimeSpan($.Time.TicksPerDay * $.numOrZero(days)) }
TimeSpan.fromWeeks = function(weeks) { return new TimeSpan($.Time.TicksPerWeek * $.numOrZero(weeks)) }

var DateTimeFormatter = function(sFormat)
{
    this.parts = [];
    this.isUTC = false;
    var plain = false,
    orChars = false,
    parenDepth = 0;
    for (var iChar = 0; iChar < sFormat.length; iChar++)
    {
        var next = sFormat.charAt(iChar);
        if (next == "'")
        {
            var literal = '';
            plain = (iChar < (sFormat.length - 1));
            while (plain && iChar < (sFormat.length - 1))
            {
                next = sFormat.charAt(++iChar);
                if (next == "'")
                {
                    if (((iChar + 1) < sFormat.length) && sFormat.charAt(iChar + 1) == "'")
                        literal += sFormat.charAt(++iChar);
                    else
                        plain = false;
                }
                else
                    literal += next;
            }
            if ($.isStrVal(literal))
                this.addPlain(literal);
        }
        else if (next == "(")
        {
            var group = '';
            parenDepth = 1;
            while (parenDepth > 0 && iChar < (sFormat.length - 1))
            {
                next = sFormat.charAt(++iChar);
                if (next == "(")
                    parenDepth++;
                else if (next == ")")
                    parenDepth--;
                if (parenDepth > 0)
                    group += next;
            }
            if ($.isStrVal(group))
                this.parts.push(new DateTimeFormatter(group));
        }
        else if (next == "[")
        {
            var group = [];
            orChars = true;
            while (orChars && iChar < (sFormat.length - 1))
            {
                next = sFormat.charAt(++iChar);
                if (next == "]")
                    orChars = false;
                else
                    group.push(next);
            }
            if (group.length > 0)
                this.parts.push(group);
        }
        else if (exists(_formats[next]))
        {
            while (exists(_formats[next + sFormat.charAt(iChar + 1)]) && iChar < sFormat.length)
                next += sFormat.charAt(++iChar);
            this.parts.push(_formats[next]);
        }
        else
            this.addPlain(next);
    }
    if (plain)
        throw "Invalid date format string: Unterminated quote ( ' ) char";
    if (orChars)
        throw "Invalid date format string: Unterminated bracket '[' char";
    if (parenDepth > 0)
        throw "Invalid date format string: Unterminated group indicator '('";
    // If this format ends w/ a literal representing UTC time
    // this will parse dates as UTC and move them to local time
    // and this will move local dates to UTC before generating a formatted string
    var end = this.parts[this.parts.length - 1];
    if ($.isStrVal(end))
    {
        for (var i = 0; i < $.Time.UTCTimezoneNames.length; i++)
        {
            var tz = $.Time.UTCTimezoneNames[i];
            if (tz.length <= end.length)
            {
                var pos = end.find(tz, true);
                if (pos == (end.length - tz.length))
                {
                    this.isUTC = true;
                    break;
                }
            }
        }
        if (!this.isUTC && end.find('0') == (end.length - 1))
        {
            this.isUTC = true;
            if (end.length == 1)
                this.parts.pop();
            else
                this.parts[this.parts.length - 1] = end.substr(0, end.length - 2);
        }
    }
}
DateTimeFormatter.prototype =
{
    addPlain: function(str)
    {
        if (this.parts.length == 0 || !$.isString(this.parts[this.parts.length - 1]))
            this.parts.push(str);
        else
            this.parts[this.parts.length - 1] += str;
    },
    format: function(dateObj)
    {
        var copy = (dateObj instanceof Date) ? new DateTime(dateObj) : dateObj.clone();
        if (this.isUTC)
            copy = copy.add(TimeSpan.fromMinutes(copy.getTimezoneOffset()));
        return this._format(copy);
    },
    parse: function(toParse)
    {
        var reg = new RegExp('^' + this.genRegX() + '$');
        var match = toParse.match(reg);
        if (match)
        {
            var date = new DateTime($.Time.TicksPerMinute * $.Time.epoch.getTimezoneOffset());
            this._applyMatches(date, match, 1);
            return this.isUTC ? date.subtract(TimeSpan.fromMinutes(date.getTimezoneOffset())) : date;
        }
        return null;
    },
    genRegX: function()
    {
        var str = '';
        for (var i = 0; i < this.parts.length; i++)
        {
            var part = this.parts[i];
            if (exists(part))
            {
                if (part instanceof DateTimeFormatter)
                    str += '(' + part.genRegX() + ')?';
                else if ($.isString(part))
                    str += part.replace(/([\\\^\$*+[\]?{}.=!:(|)])/g, "\\$&");
                else if ($.isArray(part))
                    str += '[' + part.join('').replace(/([\\\^\$*+[\]?{}.=!:(|)])/g, "\\$&") + ']';
                else
                    str += '(' + part.regx + ')';
            }
        }
        return str;
    },
    _format: function(datetime)
    {
        var str = '';
        for (var i = 0; i < this.parts.length; i++)
        {
            var part = this.parts[i];
            if (exists(part))
            {
                if (part instanceof DateTimeFormatter)
                    str += part._format(datetime);
                else if ($.isString(part))
                    str += part;
                else if ($.isArray(part))
                    str += part[0];
                else
                    str += part.get(datetime);
            }
        }
        return str;
    },
    _applyMatches: function(date, matches, groupNum)
    {
        for (var i = 0; i < this.parts.length; i++)
        {
            var part = this.parts[i];
            if (exists(part))
            {
                if (part instanceof DateTimeFormatter)
                {
                    if (matches[groupNum])
                        groupNum = part._applyMatches(date, matches, ++groupNum);
                    else
                        groupNum += (part._getGroupCount() + 1);
                }
                else if (!$.isString(part) && !$.isArray(part))
                {
                    if (matches[groupNum])
                        part.set(date, matches[groupNum]);
                    groupNum++;
                }
            }
        }
        return groupNum;
    },
    _getGroupCount: function()
    {
        var count = 0;
        for (var i = 0; i < this.parts.length; i++)
        {
            var part = this.parts[i];
            if (exists(part))
            {
                if (part instanceof DateTimeFormatter)
                    count += part._getGroupCount();
                else if (!$.isString(part) && !$.isArray(part))
                    count++;
            }
        }
        return count;
    }
}

var _dtfCache = [];

/** @namespace A set of pre-existing DateTime standard Internet formats for formatting and/or parsing DateTime's */
DateTime.Formats =
{
    /** ctime Format (HTTP) 
    * @example "ddd MMM dD HH:mm:ss yyyy" */
    ctime: "ddd MMM dD HH:mm:ss yyyy",
    /** USENET (<a href="http://www.ietf.org/rfc/rfc0850.txt">RFC 850</a>) 
    @example "dddd, d-MMM-yy HH:mm:ss Z" */
    USENET_850: "dddd, d-MMM-yy HH:mm:ss Z", // NOTE: Should be name only, but simplifying
    /** USENET (<a href="http://www.ietf.org/rfc/rfc1036.txt">RFC 1036</a>) 
    @example "ddd, d MMM yy HH:mm:ss ZZZZ" */
    USENET_1036: "ddd, d MMM yy HH:mm:ss ZZZZ",
    /** USENET/HTTP Format (RFC 850, obsoleted by RFC 1036 - Based on <a href="http://www.ietf.org/rfc/rfc2616.txt">RFC 2616</a>) 
    @example "dddd dd-MMM-yy HH:mm:ss 'GMT'" */
    USENET: "dddd dd-MMM-yy HH:mm:ss 'GMT'",
    /** ARPA Internet Text Messages (<a href="http://www.ietf.org/rfc/rfc0822.txt">RFC 822</a>) 
    @example "(ddd, )d MMM yy HH:mm(:ss) ZZZz" */
    ARPA: "(ddd, )d MMM yy HH:mm(:ss) ZZZz",
    /** <a href="http://cyber.law.harvard.edu/rss/rss.html">RSS</a> (Based on <a href="http://www.ietf.org/rfc/rfc0822.txt">RFC 822</a>) 
    @example "(ddd, )d MMM yyy HH:mm:ss 'GMT'" */
    RSS: "(ddd, )d MMM yyy HH:mm:ss 'GMT'",
    /** <a href="http://www.ietf.org/rfc/rfc2822.txt">RFC 2822</a> (Internet Message Format) 
    @example "(ddd, )d MMM yyy HH:mm(:ss) ZZZz" */
    RFC_2822: "(ddd, )d MMM yyy HH:mm(:ss) ZZZz",   // NOTE: Alpha Timezone's are technically valid, but should always be parsed as -0000
    /** <a href="http://www.ietf.org/rfc/rfc1123.txt">RFC 1123</a> (Internet Hosts - Applications and Support) 
    @example "(ddd, )d MMM yyy HH:mm(:ss) ZZZz" */
    RFC_1123: "(ddd, )d MMM yyy HH:mm(:ss) ZZZz",   // NOTE: Alpha Timezone's are technically valid, but should always be parsed as -0000
    /** HTTP Protocol (<a href="http://www.ietf.org/rfc/rfc2616.txt">RFC 2616</a>) 
    @example "ddd, dd MMM yyyy HH:mm:ss 'GMT'" */
    HTTP: "ddd, dd MMM yyyy HH:mm:ss 'GMT'",
    /** <a href="http://www.ietf.org/rfc/rfc2109.txt">RFC 2109</a> (HTTP State Management) 
    @example "ddd, dd-MMM-yy HH:mm:ss 'GMT'" */
    RFC_2109: "ddd, dd-MMM-yy HH:mm:ss 'GMT'",
    /** Cookies Formats (Based on <a href="http://www.ietf.org/rfc/rfc2109.txt">RFC 2109</a>) 
    @example "ddd, dd[ -]MMM[ -]yyyy HH:mm:ss 'GMT'" */
    Cookies: "ddd, dd[ -]MMM[ -]yyyy HH:mm:ss 'GMT'",
    /** XML Format (Based on ISO 8601) 
    @example "yyyy-MM-dd'T'HH:mm:ss(.f)zzz" */
    XML: "yyyy-MM-dd'T'HH:mm:ss(.f)zzz",
    /** <a href="http://www.w3.org/TR/NOTE-datetime">W3C Format</a> (ISO 8601) 
    @example "yyyy(-MM(-dd('T'HH:mm(:ss(.f))zzz)))" */
    W3C: "yyyy(-MM(-dd('T'HH:mm(:ss(.f))zzz)))",
    /** <a href="http://www.w3.org/TR/NOTE-datetime">W3C Format #6</a> 
    @example "yyyy-MM-dd'T'HH:mm:ss.fzzz" */
    W3C_6: "yyyy-MM-dd'T'HH:mm:ss.fzzz",
    /** <a href="http://www.w3.org/TR/NOTE-datetime">W3C Format #5</a> 
    @example "yyyy-MM-dd'T'HH:mm:sszzz" */
    W3C_5: "yyyy-MM-dd'T'HH:mm:sszzz",
    /** <a href="http://www.w3.org/TR/NOTE-datetime">W3C Format #4</a> 
    @example "yyyy-MM-dd'T'HH:mmzzz" */
    W3C_4: "yyyy-MM-dd'T'HH:mmzzz",
    /** HTML/XHTML (<a href="http://www.w3.org/TR/NOTE-datetime">W3C Format #5</a>) 
    @example "yyyy-MM-dd'T'HH:mm:sszzz" */
    HTML: "yyyy-MM-dd'T'HH:mm:sszzz",
    /** <a href="http://tools.ietf.org/html/rfc3339">RFC 3339</a> (ISO 8601) 
    @example "yyyy-MM-dd[ T]HH:mm:ss(.f)z" */
    RFC_3339: "yyyy-MM-dd[ T]HH:mm:ss(.f)z",
    /** The javascript toISOString()/toJSON() default format 
    @example "yyyy-MM-dd'T'HH:mm:ss.fff'Z'" */
    ISO_JSON: "yyyy-MM-dd'T'HH:mm:ss.fff'Z'",
    /** Standard Sortable DateTIme Format
    @example "yyyy-MM-dd'T'HH:mm:ss0" */
    Sortable: "yyyy-MM-dd'T'HH:mm:ss0",
    /** Universal Sortable DateTime Format 
    @example "yyyy-MM-dd' 'HH:mm:ss'Z'" */
    USortable: "yyyy-MM-dd' 'HH:mm:ss'Z'",
    /** .NET Standard DateTime Format 
    @example "yyyy-MM-dd'T'HH:mm:ss.fffzz" */
    DotNet: "yyyy-MM-dd'T'HH:mm:ss.fffzz",
    /** .NET ISO-8601 DateTime Format 
    @example "yyyy-MM-dd'T'HH:mm:ss([.,]f)'Z'" */
    ISO_DotNet: "yyyy-MM-dd'T'HH:mm:ss([.,]f)'Z'",
    /** .NET ISO8601 Local DateTime Format 
    @example "yyyy-MM-dd'T'HH:mm:ss([.,]f)0" */
    ISO_DotNet_Local: "yyyy-MM-dd'T'HH:mm:ss([.,]f)0",
    /** The Atom Syndication Format (<a href="http://tools.ietf.org/html/rfc4287#section-3.3">RFC 4287</a>) 
    @example "yyyy-MM-dd'T'HH:mm:ss(.f)z" */
    ATOM: "yyyy-MM-dd'T'HH:mm:ss(.f)z"
}
/** @namespace A set of pre-existing Date-only standard Internet formats for formatting and/or parsing DateObj's and DateTime's */
DateObj.Formats =
{
    /** USENET (<a href="http://www.ietf.org/rfc/rfc0850.txt">RFC 850</a>) 
    @example "dddd, d-MMM-yy" */
    USENET_850: "dddd, d-MMM-yy",
    /** USENET (<a href="http://www.ietf.org/rfc/rfc1036.txt">RFC 1036</a>) 
    @example "ddd, d MMM yy" */
    USENET_1036: "ddd, d MMM yy",
    /** USENET/HTTP Format (RFC 850, obsoleted by RFC 1036 - Based on <a href="http://www.ietf.org/rfc/rfc2616.txt">RFC 2616</a>) 
    @example "dd-MMM-yy" */
    USENET: "dd-MMM-yy",
    /** ARPA Internet Text Messages (<a href="http://www.ietf.org/rfc/rfc0822.txt">RFC 822</a>) 
    @example "d MMM yy" */
    ARPA: "d MMM yy",
    /** <a href="http://cyber.law.harvard.edu/rss/rss.html">RSS</a> (Based on <a href="http://www.ietf.org/rfc/rfc0822.txt">RFC 822</a>) 
    @example "d MMM yyy" */
    RSS: "d MMM yyy",
    /** <a href="http://www.ietf.org/rfc/rfc2822.txt">RFC 2822</a> (Internet Message Format) 
    @example "dd MMM yyy" */
    RFC_2822: "dd MMM yyy",
    /** <a href="http://www.ietf.org/rfc/rfc1123.txt">RFC 1123</a> (Internet Hosts - Applications and Support) 
    @example "dd MMM yyy" */
    RFC_1123: "dd MMM yyy",
    /** HTTP Protocol (<a href="http://www.ietf.org/rfc/rfc2616.txt">RFC 2616</a>) 
    @example "dd MMM yyyy" */
    HTTP: "dd MMM yyyy",
    /** <a href="http://www.ietf.org/rfc/rfc2109.txt">RFC 2109</a> (HTTP State Management) 
    @example "ddd, dd-MMM-yy" */
    RFC_2109: "ddd, dd-MMM-yy",
    /** Cookies Formats (Based on <a href="http://www.ietf.org/rfc/rfc2109.txt">RFC 2109</a>) 
    @example "ddd, dd[ -]MMM[ -]yyyy" */
    Cookies: "ddd, dd[ -]MMM[ -]yyyy",
    /** XML Format (Based on ISO 8601) 
    @example "yyyy-MM-dd" */
    XML: "yyyy-MM-dd",
    /** <a href="http://www.w3.org/TR/NOTE-datetime">W3C Format #3</a> 
    @example "yyyy-MM-dd" */
    W3C_3: "yyyy-MM-dd",
    /** <a href="http://www.w3.org/TR/NOTE-datetime">W3C Format #2</a> 
    @example "yyyy-MM" */
    W3C_2: "yyyy-MM",
    /** <a href="http://www.w3.org/TR/NOTE-datetime">W3C Format #1</a> 
    @example "yyyy" */
    W3C_1: "yyyy",
    /** <a href="http://tools.ietf.org/html/rfc3339">RFC 3339</a> (ISO 8601) 
    @example "yyyy-MM-dd" */
    RFC_3339: "yyyy-MM-dd",
    /** The Atom Syndication Format (<a href="http://tools.ietf.org/html/rfc4287#section-3.3">RFC 4287</a>) 
    @example "yyyy-MM-dd"*/
    ATOM: "yyyy-MM-dd"
}

var _reg1d = "\\d{1,2}",
    _reg2d = "\\d{2}",
    _regTZ = "UT|UTC|GMT|EST|EDT|CST|CDT|MST|MDT|PST|PDT",
    _regTZ2 = "[+-]\\d{2}",
    _regTZ4 = "[+-]\\d{4}",
    _regTZ5 = "[+-]\\d{2}:\\d{2}";

var _formats =
{
    '@': { regx: "\\d+", get: function(d) { return d.getTime() }, set: function(d, v) { return d.setTime(Number(v)) } },
    'd': { regx: _reg1d, get: function(d) { return d.getDate() }, set: function(d, v) { return d.setFullYear(d.getFullYear(), d.getMonth(), Number(v)) } },
    'dd': { regx: _reg2d, get: function(d) { return $.strPad(_formats['d'].get(d), 2, '0') }, set: function(d, v) { return _formats['d'].set(d, v) } },
    'ddd': { regx: $.Day.ShortNames.join('|'), get: function(d) { return $.Day.ShortNames[d.getDay()] }, set: function(d, v) { return d.moveToDay($.Day.toNumber(v)) } },
    'dddd': { regx: $.Day.Names.join('|'), get: function(d) { return $.Day.Names[d.getDay()] }, set: function(d, v) { return d.moveToDay($.Day.toNumber(v)) } },
    'D': { regx: "\\d{1,3}", get: function(d) { return d.getDayOfYear() }, set: function(d, v) { return d.setDayOfYear(Number(v)) } },
    'DD': { regx: "\\d{3}", get: function(d) { return $.strPad(_formats['D'].get(d), 3, '0') }, set: function(d, v) { return _formats['D'].set(d, v) } },
    'f': { regx: "\\d+", get: function(d) { return d.getMilliseconds() == 0 ? '0' : Number(d.getMilliseconds() / 1000).toString().substr(2) }, set: function(d, v) { return d.setHours(d.getHours(), d.getMinutes(), d.getSeconds(), (Number('0.' + (v.length > 3 ? v.substr(0, 3) : v)) * 1000)) } },
    'ff': { regx: _reg2d, get: function(d) { return $.strPad(_formats['f'].get(d), 2, '0', true).substring(0, 2) }, set: function(d, v) { return _formats['f'].set(d, v) } },
    'fff': { regx: "\\d{3}", get: function(d) { return $.strPad(_formats['f'].get(d), 3, '0', true) }, set: function(d, v) { return _formats['f'].set(d, v) } },
    'h': { regx: _reg1d, get: function(d) { return d.getHours() % 12 || 12 }, set: function(d, v) { return d.setHours(Number(v)) } },
    'hh': { regx: _reg2d, get: function(d) { return $.strPad(_formats['h'].get(d), 2, '0') }, set: function(d, v) { return _formats['h'].set(d, v) } },
    'H': { regx: _reg1d, get: function(d) { return d.getHours() }, set: function(d, v) { return d.setHours(Number(v)) } },
    'HH': { regx: _reg2d, get: function(d) { return $.strPad(_formats['H'].get(d), 2, '0') }, set: function(d, v) { return _formats['H'].set(d, v) } },
    'm': { regx: _reg1d, get: function(d) { return d.getMinutes() }, set: function(d, v) { return d.setHours(d.getHours(), Number(v)) } },
    'mm': { regx: _reg2d, get: function(d) { return $.strPad(_formats['m'].get(d), 2, '0') }, set: function(d, v) { return _formats['m'].set(d, v) } },
    'M': { regx: _reg1d, get: function(d) { return d.getMonth() + 1 }, set: function(d, v) { return d.setFullYear(d.getFullYear(), Number(v) - 1) } },
    'MM': { regx: _reg2d, get: function(d) { return $.strPad(_formats['M'].get(d), 2, '0') }, set: function(d, v) { return _formats['M'].set(d, v) } },
    'MMM': { regx: $.Month.ShortNames.join('|'), get: function(d) { return $.Month.ShortNames[d.getMonth()] }, set: function(d, v) { return d.setFullYear(d.getFullYear(), $.Month.toNumber(v)) } },
    'MMMM': { regx: $.Month.Names.join('|'), get: function(d) { return $.Month.Names[d.getMonth()] }, set: function(d, v) { return d.setFullYear(d.getFullYear(), $.Month.toNumber(v)) } },
    's': { regx: _reg1d, get: function(d) { return d.getSeconds() }, set: function(d, v) { return d.setHours(d.getHours(), d.getMinutes(), Number(v)) } },
    'ss': { regx: _reg2d, get: function(d) { return $.strPad(_formats['s'].get(d), 2, '0') }, set: function(d, v) { return _formats['s'].set(d, v) } },
    't': { regx: "a|p", get: function(d) { return _formats['T'].get(d).toLowerCase() }, set: function(d, v) { return _formats['T'].set(d, v) } },
    'tt': { regx: "am|pm", get: function(d) { return _formats['TT'].get(d).toLowerCase() }, set: function(d, v) { return _formats['TT'].set(d, v) } },
    'T': { regx: "A|P", get: function(d) { return _formats['TT'].get(d).substr(0, 1) }, set: function(d, v) { return _formats['TT'].set(d, v + 'm') } },
    'TT': { regx: "AM|PM", get: function(d) { return d.getMeridiem() }, set: function(d, v) { return d.setMeridiem(v) } },
    'w': { regx: _reg1d, get: function(d) { return d.getWeekOfYear() }, set: function(d, v) { return d.setWeekOfYear(Number(v)) } },
    'ww': { regx: _reg2d, get: function(d) { return $.strPad(_formats['w'].get(d), 2, '0') }, set: function(d, v) { return _formats['w'].set(d, v) } },
    'y': { regx: "-?\\d{1,4}", get: function(d) { return d.getFullYear() }, set: function(d, v) { return d.setFullYear(Number(v)) } },
    'yy':
    {
        regx: "-?\\d{2}",
        get: function(d) { return d.getFullYear() % 100 },
        set: function(d, v)
        {
            var val = Number(v);
            var curr = d.getFullYear() % 100;
            var up = val > curr ? (val - curr) : (100 + val) - curr;
            return up <= 50 ? d.setFullYear(d.getFullYear() + up) : d.setFullYear(d.getFullYear() - (100 - up));
        }
    },
    'yyy': { regx: "-?\\d{2}|-?\\d{1,4}", get: function(d) { return _formats['yyyy'].get(d) }, set: function(d, v) { return ((v.length == 2 && !v.startsWith('-')) || (v.length == 3 && v.startsWith('-'))) ? _formats['yy'].set(d, v) : _formats['y'].set(d, v) } },
    'yyyy': { regx: "-?\\d{4}", get: function(d) { return $.strPad(d.getFullYear(), 4, '0') }, set: function(d, v) { return _formats['y'].set(d, v) } },
    'z':
    {
        regx: $.Time.UTCNameISO + "|" + _regTZ2 + "|" + _regTZ4 + "|" + _regTZ5,
        get: function(d) { return (d.getTimezoneOffset() == 0) ? "-0000" : _formats['zzzz'].get(d) },
        set: function(d, v)
        {
            if (v == $.Time.UTCNameISO)
                d.setTimezoneOffset(0);
            else
            {
                switch (v.length)
                {
                    case 3: _formats['zz'].set(d, v);
                        break;
                    case 5: _formats['zzzz'].set(d, v);
                        break;
                    case 6: _formats['zzz'].set(d, v);
                        break;
                }
            }
            return d;
        }
    },
    'zz': { regx: $.Time.UTCNameISO + "|" + _regTZ2, get: function(d) { var off = d.getTimezoneOffset(); return off == 0 ? $.Time.UTCNameISO : (off >= 0 ? '-' : '+') + $.strPad(Math.abs(Math.round(off / 60)), 2, '0') }, set: function(d, v) { return d.setTimezoneOffset((0 - Number($.Time.UTCNameISO.equals(v) ? "0" : v)) * 60) } },
    'zzz':
    {
        regx: $.Time.UTCNameISO + "|" + _regTZ5,
        get: function(d)
        {
            var offH = d.getTimezoneOffsetHours();
            var offM = d.getTimezoneOffset() - (offH * 60);
            return (offH == 0 && offM == 0) ? $.Time.UTCNameISO : (d.getTimezoneOffset() >= 0 ? '-' : '+') + $.strPad(Math.abs(offH), 2, '0') + ':' + $.strPad(Math.abs(offM), 2, '0');
        },
        set: function(d, v) { var tz = $.Time.UTCNameISO.equals(v) ? '-00:00' : v; return d.setTimezoneOffset((tz.startsWith('-') ? 1 : -1) * ((Number(tz.substr(1, 2)) * 60) + Number(tz.substr(4)))) }
    },
    'zzzz': { regx: $.Time.UTCNameISO + "|" + _regTZ4, get: function(d) { return _formats['zzz'].get(d).replace(':', '') }, set: function(d, v) { var val = $.Time.UTCNameISO.equals(v) ? 0 : Number(v); return d.setTimezoneOffset((val < 0 ? 1 : -1) * ((Math.abs(Math.floor(val / 100)) * 60) + (Math.abs(val) % 100))) } },
    'Z':
    {
        regx: _regTZ + "|" + _regTZ2 + "|" + _regTZ4 + "|" + _regTZ5,
        get: function(d) { return _formats['z'].get(d) },
        set: function(d, v)
        {
            if (v.match(new RegExp("^" + _regTZ + "$")))
            {
                if (exists($.Time.TimezoneOffsets[v]))
                    d.setTimezoneOffset($.Time.TimezoneOffsets[v]);
            }
            else
            {
                switch (v.length)
                {
                    case 3: _formats['zz'].set(d, v);
                        break;
                    case 5: _formats['zzzz'].set(d, v);
                        break;
                    case 6: _formats['zzz'].set(d, v);
                        break;
                }
            }
            return d;
        }
    },
    'ZZ':
    {
        regx: _regTZ + "|" + _regTZ2,
        get: function(d)
        {
            var off = d.getTimezoneOffset();
            if (off == 0)
                return $.Time.UTCName;
            else if (exists($.Time.DaylightSavingsTimezones[off]) && d.isDST())
                return $.Time.DaylightSavingsTimezones[off];
            else if (exists($.Time.StandardTimezones[off]) && !d.isDST())
                return $.Time.StandardTimezones[off];
            else
                return (off >= 0 ? '-' : '+') + $.strPad(Math.abs(Math.round(off / 60)), 2, '0');
        },
        set: function(d, v)
        {
            if (v.match(new RegExp("^" + _regTZ + "$")))
            {
                if (exists($.Time.TimezoneOffsets[v]))
                    return d.setTimezoneOffset($.Time.TimezoneOffsets[v]);
                else
                    return d;
            }
            else
                return d.setTimezoneOffset((0 - Number(v)) * 60);
        }
    },
    'ZZZ':
    {
        regx: _regTZ + "|" + _regTZ5,
        get: function(d)
        {
            var off = d.getTimezoneOffset();
            if (off == 0)
                return $.Time.UTCName;
            else if (exists($.Time.DaylightSavingsTimezones[off]) && d.isDST())
                return $.Time.DaylightSavingsTimezones[off];
            else if (exists($.Time.StandardTimezones[off]) && !d.isDST())
                return $.Time.StandardTimezones[off];
            else
                return (off >= 0 ? '-' : '+') + $.strPad(Math.abs(Math.floor(off / 60)), 2, '0') + ':' + $.strPad(Math.abs(off % 60), 2, '0');
        },
        set: function(d, v)
        {
            if (v.match(new RegExp("^" + _regTZ + "$")))
            {
                if (exists($.Time.TimezoneOffsets[v]))
                    return d.setTimezoneOffset($.Time.TimezoneOffsets[v]);
                else
                    return d;
            }
            else
                return d.setTimezoneOffset((v.startsWith('-') ? 1 : -1) * ((Number(v.substr(1, 2)) * 60) + Number(v.substr(4))));
        }
    },
    'ZZZZ':
    {
        regx: _regTZ + "|" + _regTZ4,
        get: function(d) { return _formats['ZZZ'].get(d).replace(":", "") },
        set: function(d, v)
        {
            if (v.match(new RegExp("^" + _regTZ + "$")))
            {
                if (exists($.Time.TimezoneOffsets[v]))
                    return d.setTimezoneOffset($.Time.TimezoneOffsets[v]);
                else
                    return d;
            }
            else
            {
                var val = Number(v);
                return d.setTimezoneOffset((val < 0 ? 1 : -1) * ((Math.abs(Math.floor(val / 100)) * 60) + (Math.abs(val) % 100)));
            }
        }
    },
    'o':
    {
        regx: "\\d{1,2}th|\\d{1,2}st|\\d{1,2}nd|\\d{1,2}rd",
        get: function(d)
        {
            var date = d.getDate();
            if (date > 10 && date < 20)
                return date + 'th';
            return date + (['st', 'nd', 'rd'][date % 10 - 1] || 'th');
        },
        set: function(d, v) { return d.setDate(Number(v.substr(0, v.length - 2))) }
    },
    // For Internal Use Only
    'ZZZz': { regx: _regTZ + "|" + _regTZ4 + "|[A-Ia-iK-Zk-z]", get: function(d) { return _formats['ZZZZ'].get(d) }, set: function(d, v) { return v.length != 1 ? _formats['ZZZZ'].set(d, v) : d } },
    'dD': { regx: "[ 123]\\d", get: function(d) { return $.strPad(d.getDate(), 2, " ") }, set: function(d, v) { return _formats['d'].set(d, v.trim()) } }
};

})(jQuery);