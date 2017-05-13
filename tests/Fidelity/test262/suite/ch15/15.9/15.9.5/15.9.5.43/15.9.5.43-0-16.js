/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.9/15.9.5/15.9.5.43/15.9.5.43-0-16.js
 * @description Date.prototype.toISOString - when this is a String object that value format is 'YYYY-MM-DDTHH:mm:ss.sssZ' Date.prototype.toISOString throw the TypeError
 */


function testcase() {
        var date = new String("1970-01-00000:00:00.000Z");

        try {
            Date.prototype.toISOString.call(date);
            return false;
        } catch (ex) {
            return ex instanceof TypeError;
        }
    }
runTestCase(testcase);
