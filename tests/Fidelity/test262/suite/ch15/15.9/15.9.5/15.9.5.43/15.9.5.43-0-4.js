/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.9/15.9.5/15.9.5.43/15.9.5.43-0-4.js
 * @description Date.prototype.toISOString - format of returned string is 'YYYY-MM-DDTHH:mm:ss.sssZ', the time zone is UTC(0)
 */


function testcase() {
        var date = new Date(1999, 9, 10, 10, 10, 10, 10);
        var localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);

        return localDate.toISOString() === "1999-10-10T10:10:10.010Z";
    }
runTestCase(testcase);
