/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.19/15.4.4.19-1-15.js
 * @description Array.prototype.map - applied to the Arguments object
 */


function testcase() {
        function callbackfn(val, idx, obj) {
            return ('[object Arguments]' === Object.prototype.toString.call(obj));
        }

        var obj = (function () {
            return arguments;
        }("a", "b"));

        var testResult = Array.prototype.map.call(obj, callbackfn);

        return testResult[1] === true;
    }
runTestCase(testcase);
