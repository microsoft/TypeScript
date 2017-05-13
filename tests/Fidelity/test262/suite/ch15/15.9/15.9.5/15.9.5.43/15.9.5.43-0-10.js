/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.9/15.9.5/15.9.5.43/15.9.5.43-0-10.js
 * @description Date.prototype.toISOString - RangeError is not thrown when value of date is Date(1970, 0, -99999999, 0, 0, 0, 1), the time zone is UTC(0)
 */


function testcase() {
        var timeZoneMinutes = new Date().getTimezoneOffset() * (-1);
        var date, dateStr;

        if (timeZoneMinutes > 0) {
            date = new Date(1970, 0, -99999999, 0, 0, 0, 1);

            try {
                date.toISOString();
                return false;
            } catch (e) {
                return e instanceof RangeError;
            }
        } else {
            date = new Date(1970, 0, -99999999, 0, 0 + timeZoneMinutes + 60, 0, 1);

            dateStr = date.toISOString();

            return dateStr[dateStr.length - 1] === "Z";
        }
    }
runTestCase(testcase);
