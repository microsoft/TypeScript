/*
 * Utilities: A classic collection of JavaScript utilities
 * Copyright 2112 Matthew Eernisse (mde@fleegix.org)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
*/

var string = require('./string')
  , date
  , log = require('./log');

/**
  @name date
  @namespace date
*/

date = new (function () {
  var _this = this
    , _date = new Date();

  var _US_DATE_PAT = /^(\d{1,2})(?:\-|\/|\.)(\d{1,2})(?:\-|\/|\.)(\d{4})/;
  var _DATETIME_PAT = /^(\d{4})(?:\-|\/|\.)(\d{1,2})(?:\-|\/|\.)(\d{1,2})(?:T| )?(\d{2})?(?::)?(\d{2})?(?::)?(\d{2})?(?:\.)?(\d+)?(?: *)?(Z|[+-]\d{4}|[+-]\d{2}:\d{2}|[+-]\d{2})?/;
  // TODO Add am/pm parsing instead of dumb, 24-hour clock.
  var _TIME_PAT = /^(\d{1,2})?(?::)?(\d{2})?(?::)?(\d{2})?(?:\.)?(\d+)?$/;

  var _dateMethods = [
      'FullYear'
    , 'Month'
    , 'Date'
    , 'Hours'
    , 'Minutes'
    , 'Seconds'
    , 'Milliseconds'
  ];

  var _isArray = function (obj) {
    return obj &&
      typeof obj === 'object' &&
      typeof obj.length === 'number' &&
      typeof obj.splice === 'function' &&
      !(obj.propertyIsEnumerable('length'));
  };

  this.weekdayLong = ['Sunday', 'Monday', 'Tuesday',
    'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  this.weekdayShort = ['Sun', 'Mon', 'Tue', 'Wed',
    'Thu', 'Fri', 'Sat'];
  this.monthLong = ['January', 'February', 'March',
    'April', 'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December'];
  this.monthShort = ['Jan', 'Feb', 'Mar', 'Apr',
    'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  this.meridiem = {
    'AM': 'AM',
    'PM': 'PM'
  }
  // compat
  this.meridian = this.meridiem

  /**
    @name date#supportedFormats
    @public
    @object
    @description List of supported strftime formats
  */
  this.supportedFormats = {
    // abbreviated weekday name according to the current locale
    'a': function (dt) { return _this.weekdayShort[dt.getDay()]; },
    // full weekday name according to the current locale
    'A': function (dt) { return _this.weekdayLong[dt.getDay()]; },
    //  abbreviated month name according to the current locale
    'b': function (dt) { return _this.monthShort[dt.getMonth()]; },
    'h': function (dt) { return _this.strftime(dt, '%b'); },
    // full month name according to the current locale
    'B': function (dt) { return _this.monthLong[dt.getMonth()]; },
    // preferred date and time representation for the current locale
    'c': function (dt) { return _this.strftime(dt, '%a %b %d %T %Y'); },
    // century number (the year divided by 100 and truncated
    // to an integer, range 00 to 99)
    'C': function (dt) { return _this.calcCentury(dt.getFullYear());; },
    // day of the month as a decimal number (range 01 to 31)
    'd': function (dt) { return string.lpad(dt.getDate(), '0', 2); },
    // same as %m/%d/%y
    'D': function (dt) { return _this.strftime(dt, '%m/%d/%y') },
    // day of the month as a decimal number, a single digit is
    // preceded by a space (range ' 1' to '31')
    'e': function (dt) { return string.lpad(dt.getDate(), ' ', 2); },
    // month as a decimal number, a single digit is
    // preceded by a space (range ' 1' to '12')
    'f': function () { return _this.strftimeNotImplemented('f'); },
    // same as %Y-%m-%d
    'F': function (dt) { return _this.strftime(dt, '%Y-%m-%d');  },
    // like %G, but without the century.
    'g': function () { return _this.strftimeNotImplemented('g'); },
    // The 4-digit year corresponding to the ISO week number
    // (see %V).  This has the same format and value as %Y,
    // except that if the ISO week number belongs to the
    // previous or next year, that year is used instead.
    'G': function () { return _this.strftimeNotImplemented('G'); },
    // hour as a decimal number using a 24-hour clock (range
    // 00 to 23)
    'H': function (dt) { return string.lpad(dt.getHours(), '0', 2); },
    // hour as a decimal number using a 12-hour clock (range
    // 01 to 12)
    'I': function (dt) { return string.lpad(
      _this.hrMil2Std(dt.getHours()), '0', 2); },
    // day of the year as a decimal number (range 001 to 366)
    'j': function (dt) { return string.lpad(
      _this.calcDays(dt), '0', 3); },
    // Hour as a decimal number using a 24-hour clock (range
    // 0 to 23 (space-padded))
    'k': function (dt) { return string.lpad(dt.getHours(), ' ', 2); },
    // Hour as a decimal number using a 12-hour clock (range
    // 1 to 12 (space-padded))
    'l': function (dt) { return string.lpad(
      _this.hrMil2Std(dt.getHours()), ' ', 2); },
    // month as a decimal number (range 01 to 12)
    'm': function (dt) { return string.lpad((dt.getMonth()+1), '0', 2); },
    // minute as a decimal number
    'M': function (dt) { return string.lpad(dt.getMinutes(), '0', 2); },
    // Linebreak
    'n': function () { return '\n'; },
    // either `am' or `pm' according to the given time value,
    // or the corresponding strings for the current locale
    'p': function (dt) { return _this.getMeridian(dt.getHours()); },
    // time in a.m. and p.m. notation
    'r': function (dt) { return _this.strftime(dt, '%I:%M:%S %p'); },
    // time in 24 hour notation
    'R': function (dt) { return _this.strftime(dt, '%H:%M'); },
    // second as a decimal number
    'S': function (dt) { return string.lpad(dt.getSeconds(), '0', 2); },
    // Tab char
    't': function () { return '\t'; },
    // current time, equal to %H:%M:%S
    'T': function (dt) { return _this.strftime(dt, '%H:%M:%S'); },
    // weekday as a decimal number [1,7], with 1 representing
    // Monday
    'u': function (dt) { return _this.convertOneBase(dt.getDay()); },
    // week number of the current year as a decimal number,
    // starting with the first Sunday as the first day of the
    // first week
    'U': function () { return _this.strftimeNotImplemented('U'); },
    // week number of the year (Monday as the first day of the
    // week) as a decimal number [01,53]. If the week containing
    // 1 January has four or more days in the new year, then it
    // is considered week 1. Otherwise, it is the last week of
    // the previous year, and the next week is week 1.
    'V': function () { return _this.strftimeNotImplemented('V'); },
    // week number of the current year as a decimal number,
    // starting with the first Monday as the first day of the
    // first week
    'W': function () { return _this.strftimeNotImplemented('W'); },
    // day of the week as a decimal, Sunday being 0
    'w': function (dt) { return dt.getDay(); },
    // preferred date representation for the current locale
    // without the time
    'x': function (dt) { return _this.strftime(dt, '%D'); },
    // preferred time representation for the current locale
    // without the date
    'X': function (dt) { return _this.strftime(dt, '%T'); },
    // year as a decimal number without a century (range 00 to
    // 99)
    'y': function (dt) { return _this.getTwoDigitYear(dt.getFullYear()); },
    // year as a decimal number including the century
    'Y': function (dt) { return string.lpad(dt.getFullYear(), '0', 4); },
    // time zone or name or abbreviation
    'z': function () { return _this.strftimeNotImplemented('z'); },
    'Z': function () { return _this.strftimeNotImplemented('Z'); },
    // Literal percent char
    '%': function (dt) { return '%'; }
  };

  /**
    @name date#getSupportedFormats
    @public
    @function
    @description return the list of formats in a string
    @return {String} The list of supported formats
  */
  this.getSupportedFormats = function () {
    var str = '';
    for (var i in this.supportedFormats) { str += i; }
    return str;
  }

  this.supportedFormatsPat = new RegExp('%[' +
      this.getSupportedFormats() + ']{1}', 'g');

  /**
    @name date#strftime
    @public
    @function
    @return {String} The `dt` formated with the given `format`
    @description Formats the given date with the strftime formated
    @param {Date} dt the date object to format
    @param {String} format the format to convert the date to
  */
  this.strftime = function (dt, format) {
    if (!dt) { return '' }

    var d = dt;
    var pats = [];
    var dts = [];
    var str = format;
    var key;

    // Allow either Date obj or UTC stamp
    d = typeof dt == 'number' ? new Date(dt) : dt;

    // Grab all instances of expected formats into array
    while (pats = this.supportedFormatsPat.exec(format)) {
      dts.push(pats[0]);
    }

    // Process any hits
    for (var i = 0; i < dts.length; i++) {
      key = dts[i].replace(/%/, '');
      str = str.replace('%' + key,
        this.supportedFormats[key](d));
    }
    return str;

  };

  this.strftimeNotImplemented = function (s) {
    throw('this.strftime format "' + s + '" not implemented.');
  };

  /**
    @name date#calcCentury
    @public
    @function
    @return {String} The century for the given date
    @description Find the century for the given `year`
    @param {Number} year The year to find the century for
  */
  this.calcCentury = function (year) {
    if(!year) {
      year = _date.getFullYear();
    }

    var ret = parseInt((year / 100) + 1);
    year = year.toString();

    // If year ends in 00 subtract one, because it's still the century before the one
    // it divides to
    if (year.substring(year.length - 2) === '00') {
      ret--;
    }

    return ret.toString();
  };

  /**
    @name date#calcDays
    @public
    @function
    @return {Number} The number of days so far for the given date
    @description Calculate the day number in the year a particular date is on
    @param {Date} dt The date to use
  */
  this.calcDays = function (dt) {
    var first = new Date(dt.getFullYear(), 0, 1);
    var diff = 0;
    var ret = 0;
    first = first.getTime();
    diff = (dt.getTime() - first);
    ret = parseInt(((((diff/1000)/60)/60)/24))+1;
    return ret;
  };

  /**
   * Adjust from 0-6 base week to 1-7 base week
   * @param d integer for day of week
   * @return Integer day number for 1-7 base week
   */
  this.convertOneBase = function (d) {
    return d == 0 ? 7 : d;
  };

  this.getTwoDigitYear = function (yr) {
    // Add a millenium to take care of years before the year 1000,
    // (e.g, the year 7) since we're only taking the last two digits
    // If we overshoot, it doesn't matter
    var millenYear = yr + 1000;
    var str = millenYear.toString();
    str = str.substr(2); // Get the last two digits
    return str
  };

  /**
    @name date#getMeridiem
    @public
    @function
    @return {String} Return 'AM' or 'PM' based on hour in 24-hour format
    @description Return 'AM' or 'PM' based on hour in 24-hour format
    @param {Number} h The hour to check
  */
  this.getMeridiem = function (h) {
    return h > 11 ? this.meridiem.PM :
      this.meridiem.AM;
  };
  // Compat
  this.getMeridian = this.getMeridiem;

  /**
    @name date#hrMil2Std
    @public
    @function
    @return {String} Return a 12 hour version of the given time
    @description Convert a 24-hour formatted hour to 12-hour format
    @param {String} hour The hour to convert
  */
  this.hrMil2Std = function (hour) {
    var h = typeof hour == 'number' ? hour : parseInt(hour);
    var str = h > 12 ? h - 12 : h;
    str = str == 0 ? 12 : str;
    return str;
  };

  /**
    @name date#hrStd2Mil
    @public
    @function
    @return {String} Return a 24 hour version of the given time
    @description Convert a 12-hour formatted hour with meridian flag to 24-hour format
    @param {String} hour The hour to convert
    @param {Boolean} pm hour is PM then this should be true
  */
  this.hrStd2Mil = function  (hour, pm) {
    var h = typeof hour == 'number' ? hour : parseInt(hour);
    var str = '';
    // PM
    if (pm) {
      str = h < 12 ? (h+12) : h;
    }
    // AM
    else {
      str = h == 12 ? 0 : h;
    }
    return str;
  };

  // Constants for use in this.add
  var dateParts = {
    YEAR: 'year'
    , MONTH: 'month'
    , DAY: 'day'
    , HOUR: 'hour'
    , MINUTE: 'minute'
    , SECOND: 'second'
    , MILLISECOND: 'millisecond'
    , QUARTER: 'quarter'
    , WEEK: 'week'
    , WEEKDAY: 'weekday'
  };
  // Create a map for singular/plural lookup, e.g., day/days
  var datePartsMap = {};
  for (var p in dateParts) {
    datePartsMap[dateParts[p]] = dateParts[p];
    datePartsMap[dateParts[p] + 's'] = dateParts[p];
  }
  this.dateParts = dateParts;

  /**
    @name date#add
    @public
    @function
    @return {Date} Incremented date
    @description Add to a Date in intervals of different size, from
                 milliseconds to years
    @param {Date} dt Date (or timestamp Number), date to increment
    @param {String} interv a constant representing the interval,
    e.g. YEAR, MONTH, DAY.  See this.dateParts
    @param {Number} incr how much to add to the date
  */
  this.add = function (dt, interv, incr) {
    if (typeof dt == 'number') { dt = new Date(dt); }
    function fixOvershoot() {
      if (sum.getDate() < dt.getDate()) {
        sum.setDate(0);
      }
    }
    var key = datePartsMap[interv];
    var sum = new Date(dt);
    switch (key) {
      case dateParts.YEAR:
        sum.setFullYear(dt.getFullYear()+incr);
        // Keep increment/decrement from 2/29 out of March
        fixOvershoot();
        break;
      case dateParts.QUARTER:
        // Naive quarter is just three months
        incr*=3;
        // fallthrough...
      case dateParts.MONTH:
        sum.setMonth(dt.getMonth()+incr);
        // Reset to last day of month if you overshoot
        fixOvershoot();
        break;
      case dateParts.WEEK:
        incr*=7;
        // fallthrough...
      case dateParts.DAY:
        sum.setDate(dt.getDate() + incr);
        break;
      case dateParts.WEEKDAY:
        //FIXME: assumes Saturday/Sunday weekend, but even this is not fixed.
        // There are CLDR entries to localize this.
        var dat = dt.getDate();
        var weeks = 0;
        var days = 0;
        var strt = 0;
        var trgt = 0;
        var adj = 0;
        // Divide the increment time span into weekspans plus leftover days
        // e.g., 8 days is one 5-day weekspan / and two leftover days
        // Can't have zero leftover days, so numbers divisible by 5 get
        // a days value of 5, and the remaining days make up the number of weeks
        var mod = incr % 5;
        if (mod == 0) {
          days = (incr > 0) ? 5 : -5;
          weeks = (incr > 0) ? ((incr-5)/5) : ((incr+5)/5);
        }
        else {
          days = mod;
          weeks = parseInt(incr/5);
        }
        // Get weekday value for orig date param
        strt = dt.getDay();
        // Orig date is Sat / positive incrementer
        // Jump over Sun
        if (strt == 6 && incr > 0) {
          adj = 1;
        }
        // Orig date is Sun / negative incrementer
        // Jump back over Sat
        else if (strt == 0 && incr < 0) {
          adj = -1;
        }
        // Get weekday val for the new date
        trgt = strt + days;
        // New date is on Sat or Sun
        if (trgt == 0 || trgt == 6) {
          adj = (incr > 0) ? 2 : -2;
        }
        // Increment by number of weeks plus leftover days plus
        // weekend adjustments
        sum.setDate(dat + (7*weeks) + days + adj);
        break;
      case dateParts.HOUR:
        sum.setHours(sum.getHours()+incr);
        break;
      case dateParts.MINUTE:
        sum.setMinutes(sum.getMinutes()+incr);
        break;
      case dateParts.SECOND:
        sum.setSeconds(sum.getSeconds()+incr);
        break;
      case dateParts.MILLISECOND:
        sum.setMilliseconds(sum.getMilliseconds()+incr);
        break;
      default:
        // Do nothing
        break;
    }
    return sum; // Date
  };

  /**
    @name date#diff
    @public
    @function
    @return {Number} number of (interv) units apart that
    the two dates are
    @description Get the difference in a specific unit of time (e.g., number
                 of months, weeks, days, etc.) between two dates.
    @param {Date} date1 First date to check
    @param {Date} date2 Date to compate `date1` with
    @param {String} interv a constant representing the interval,
    e.g. YEAR, MONTH, DAY.  See this.dateParts
  */
  this.diff = function (date1, date2, interv) {
    //  date1
    //    Date object or Number equivalent
    //
    //  date2
    //    Date object or Number equivalent
    //
    //  interval
    //    A constant representing the interval, e.g. YEAR, MONTH, DAY.  See this.dateParts.

    // Accept timestamp input
    if (typeof date1 == 'number') { date1 = new Date(date1); }
    if (typeof date2 == 'number') { date2 = new Date(date2); }
    var yeaDiff = date2.getFullYear() - date1.getFullYear();
    var monDiff = (date2.getMonth() - date1.getMonth()) + (yeaDiff * 12);
    var msDiff = date2.getTime() - date1.getTime(); // Millisecs
    var secDiff = msDiff/1000;
    var minDiff = secDiff/60;
    var houDiff = minDiff/60;
    var dayDiff = houDiff/24;
    var weeDiff = dayDiff/7;
    var delta = 0; // Integer return value

    var key = datePartsMap[interv];
    switch (key) {
      case dateParts.YEAR:
        delta = yeaDiff;
        break;
      case dateParts.QUARTER:
        var m1 = date1.getMonth();
        var m2 = date2.getMonth();
        // Figure out which quarter the months are in
        var q1 = Math.floor(m1/3) + 1;
        var q2 = Math.floor(m2/3) + 1;
        // Add quarters for any year difference between the dates
        q2 += (yeaDiff * 4);
        delta = q2 - q1;
        break;
      case dateParts.MONTH:
        delta = monDiff;
        break;
      case dateParts.WEEK:
        // Truncate instead of rounding
        // Don't use Math.floor -- value may be negative
        delta = parseInt(weeDiff);
        break;
      case dateParts.DAY:
        delta = dayDiff;
        break;
      case dateParts.WEEKDAY:
        var days = Math.round(dayDiff);
        var weeks = parseInt(days/7);
        var mod = days % 7;

        // Even number of weeks
        if (mod == 0) {
          days = weeks*5;
        }
        else {
          // Weeks plus spare change (< 7 days)
          var adj = 0;
          var aDay = date1.getDay();
          var bDay = date2.getDay();

          weeks = parseInt(days/7);
          mod = days % 7;
          // Mark the date advanced by the number of
          // round weeks (may be zero)
          var dtMark = new Date(date1);
          dtMark.setDate(dtMark.getDate()+(weeks*7));
          var dayMark = dtMark.getDay();

          // Spare change days -- 6 or less
          if (dayDiff > 0) {
            switch (true) {
              // Range starts on Sat
              case aDay == 6:
                adj = -1;
                break;
              // Range starts on Sun
              case aDay == 0:
                adj = 0;
                break;
              // Range ends on Sat
              case bDay == 6:
                adj = -1;
                break;
              // Range ends on Sun
              case bDay == 0:
                adj = -2;
                break;
              // Range contains weekend
              case (dayMark + mod) > 5:
                adj = -2;
                break;
              default:
                // Do nothing
                break;
            }
          }
          else if (dayDiff < 0) {
            switch (true) {
              // Range starts on Sat
              case aDay == 6:
                adj = 0;
                break;
              // Range starts on Sun
              case aDay == 0:
                adj = 1;
                break;
              // Range ends on Sat
              case bDay == 6:
                adj = 2;
                break;
              // Range ends on Sun
              case bDay == 0:
                adj = 1;
                break;
              // Range contains weekend
              case (dayMark + mod) < 0:
                adj = 2;
                break;
              default:
                // Do nothing
                break;
            }
          }
          days += adj;
          days -= (weeks*2);
        }
        delta = days;

        break;
      case dateParts.HOUR:
        delta = houDiff;
        break;
      case dateParts.MINUTE:
        delta = minDiff;
        break;
      case dateParts.SECOND:
        delta = secDiff;
        break;
      case dateParts.MILLISECOND:
        delta = msDiff;
        break;
      default:
        // Do nothing
        break;
    }
    // Round for fractional values and DST leaps
    return Math.round(delta); // Number (integer)
  };

  /**
    @name date#parse
    @public
    @function
    @return {Date} a JavaScript Date object
    @description Convert various sorts of strings to JavaScript
                 Date objects
    @param {String} val The string to convert to a Date
  */
  this.parse = function (val, options) {
    var dt
      , opts = options || {}
      , matches
      , reordered
      , off
      , posOff
      , offHours
      , offMinutes
      , offSeconds
      , curr
      , stamp
      , utc;

    // Yay, we have a date, use it as-is
    if (val instanceof Date || typeof val.getFullYear == 'function') {
      dt = val;
    }

    // Timestamp?
    else if (typeof val == 'number') {
      dt = new Date(val);
    }

    // String or Array
    else {
      // Value preparsed, looks like [yyyy, mo, dd, hh, mi, ss, ms, (offset?)]
      if (_isArray(val)) {
        matches = val;
        matches.unshift(null);
        matches[8] = null;
      }

      // Oh, crap, it's a string -- parse this bitch
      else if (typeof val == 'string') {
        matches = val.match(_DATETIME_PAT);

        // Stupid US-only format?
        if (!matches) {
          matches = val.match(_US_DATE_PAT);
          if (matches) {
            reordered = [matches[0], matches[3], matches[1], matches[2]];
            // Pad the results to the same length as ISO8601
            reordered[8] = null;
            matches = reordered;
          }
        }

        // Time-stored-in-Date hack?
        if (!matches) {
          matches = val.match(_TIME_PAT);
          if (matches) {
            reordered = [matches[0], 0, 1, 0, matches[1],
                matches[2], matches[3], matches[4], null];
            matches = reordered;
          }
        }

      }

      // Sweet, the regex actually parsed it into something useful
      if (matches) {
        matches.shift(); // First match is entire match, DO NOT WANT

        off = matches.pop();
        // If there's an offset (or the 'Z' non-offset offset), use UTC
        // methods to set everything
        if (off) {
          if (off == 'Z') {
            utc = true;
            offSeconds = 0;
          }
          else {
            utc = false;
            // Convert from extended to basic if necessary
            off = off.replace(/:/g, '');
            // '+0000' will still be zero
            if (parseInt(off, 10) === 0) {
              utc = true;
            }
            else {
              posOff = off.indexOf('+') === 0;
              // Strip plus or minus
              off = off.substr(1);

              offHours = parseInt(off.substr(0, 2), 10);

              offMinutes = off.substr(2, 2);
              if (offMinutes) {
                offMinutes = parseInt(offMinutes, 10);
              }
              else {
                offMinutes = 0;
              }

              offSeconds = off.substr(4, 2);
              if (offSeconds) {
                offSeconds = parseInt(offSeconds, 10);
              }
              else {
                offSeconds = 0;
              }

              offSeconds += (offMinutes * 60)
              offSeconds += (offHours * 60 * 60);
              if (!posOff) {
                offSeconds = 0 - offSeconds;
              }
            }
          }
        }

        dt = new Date(0);

        // Stupid zero-based months
        matches[1] = parseInt(matches[1], 10) - 1;

        // Specific offset, iterate the array and set each date property
        // using UTC setters, then adjust time using offset
        if (off) {
          for (var i = matches.length - 1; i > -1; i--) {
            curr = parseInt(matches[i], 10) || 0;
            dt['setUTC' + _dateMethods[i]](curr);
          }
          // Add any offset
          dt.setSeconds(dt.getSeconds() - offSeconds);
        }
        // Otherwise we know nothing about the offset, just iterate the
        // array and set each date property using regular setters
        else {
          var lastValIndex;
          for (var i = matches.length - 1; i > -1; i--) {
            if (matches[i]) {
              curr = parseInt(matches[i], 10);
              if (typeof lastValIndex == 'undefined') {
                lastValIndex = i;
              }
            }
            else {
              curr = 0;
            }
            dt['set' + _dateMethods[i]](curr);
          }
          if (opts.setMax) {
            for (var i = lastValIndex + 1, ii = matches.length; i < ii; i++) {
              switch (i) {
                case 3:
                  dt['set' + _dateMethods[i]](23);
                  break;
                case 4:
                case 5:
                  dt['set' + _dateMethods[i]](59);
                  break;
                case 6:
                  dt.setMilliseconds(999);
                  break;
              }
            }
          }
        }
      }

      // Shit, last-ditch effort using Date.parse
      else {
        stamp = Date.parse(val);
        // Failures to parse yield NaN
        if (!isNaN(stamp)) {
          dt = new Date(stamp);
        }
      }

    }

    return dt || null;
  };

  /**
    @name date#relativeTime
    @public
    @function
    @return {String} A string describing the amount of time ago
    the passed-in Date is
    @description Convert a Date to an English sentence representing
    how long ago the Date was
    @param {Date} dt The Date to to convert to a relative time string
    @param {Object} [opts]
      @param {Boolean} [opts.abbreviated=false] Use short strings
      (e.g., '<1m') for the relative-time string
  */
  this.relativeTime = function (dt, options) {
    var opts = options || {}
      , now = opts.now || new Date()
      , abbr = opts.abbreviated || false
      , format = opts.format || '%F %T'
    // Diff in seconds
      , diff = (now.getTime() - dt.getTime()) / 1000
      , ret
      , num
      , hour = 60*60
      , day = 24*hour
      , week = 7*day
      , month = 30*day;
    switch (true) {
      case diff < 60:
        ret = abbr ? '<1m' : 'less than a minute ago';
        break;
      case diff < 120:
        ret = abbr ? '1m' : 'about a minute ago';
        break;
      case diff < (45*60):
        num = parseInt((diff / 60), 10);
        ret = abbr ? num + 'm' : num + ' minutes ago';
        break;
      case diff < (2*hour):
        ret = abbr ? '1h' : 'about an hour ago';
        break;
      case diff < (1*day):
        num = parseInt((diff / hour), 10);
        ret = abbr ? num + 'h' : 'about ' + num + ' hours ago';
        break;
      case diff < (2*day):
        ret = abbr ? '1d' : 'one day ago';
        break;
      case diff < (7*day):
        num = parseInt((diff / day), 10);
        ret = abbr ? num + 'd' : 'about ' + num + ' days ago';
        break;
      case diff < (11*day):
        ret = abbr ? '1w': 'one week ago';
        break;
      case diff < (1*month):
        num = Math.round(diff / week);
        ret = abbr ? num + 'w' : 'about ' + num + ' weeks ago';
        break;
      default:
        ret = date.strftime(dt, format);
        break;
    }
    return ret;
  };

  /**
    @name date#toISO8601
    @public
    @function
    @return {String} A string describing the amount of time ago
    @description Convert a Date to an ISO8601-formatted string
    @param {Date} dt The Date to to convert to an ISO8601 string
  */
  var _pad = function (n) {
    return n < 10 ? '0' + n : n;
  };
  this.toISO8601 = function (dt, options) {
    var opts = options || {}
      , off = dt.getTimezoneOffset()
      , offHours
      , offMinutes
      , str = this.strftime(dt, '%F') + 'T'
          + this.strftime(dt, '%T') + '.'
          + string.lpad(dt.getMilliseconds(), '0', 3);

    if (opts.tz) {
      // Pos and neg numbers are both truthy; only
      // zero is falsy
      if (off && !opts.utc) {
        str += off > 0 ? '-' : '+';
        offHours = parseInt(off / 60, 10);
        str += string.lpad(offHours, '0', 2);
        offMinutes = off % 60;
        if (offMinutes) {
          str += string.lpad(offMinutes, '0', 2);
        }
      }
      else {
        str += 'Z';
      }
    }

    return str;
  };

  // Alias
  this.toIso8601 = this.toISO8601;

  this.toUTC = function (dt) {
    return new Date(
        dt.getUTCFullYear()
      , dt.getUTCMonth()
      , dt.getUTCDate()
      , dt.getUTCHours()
      , dt.getUTCMinutes()
      , dt.getUTCSeconds()
      , dt.getUTCMilliseconds());
  };

})();

module.exports = date;


