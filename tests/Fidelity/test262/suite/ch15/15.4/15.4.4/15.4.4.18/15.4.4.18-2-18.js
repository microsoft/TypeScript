/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.18/15.4.4.18-2-18.js
 * @description Array.prototype.forEach applied to String object, which implements its own property get method
 */


function testcase() {
        var result = false;
        function callbackfn(val, idx, obj) {
            result = (obj.length === 3);
        }

        var str = new String("012");

        Array.prototype.forEach.call(str, callbackfn);
        return result;
    }
runTestCase(testcase);
