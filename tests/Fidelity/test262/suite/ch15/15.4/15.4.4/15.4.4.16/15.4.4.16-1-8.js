/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.16/15.4.4.16-1-8.js
 * @description Array.prototype.every applied to String object
 */


function testcase() {
        function callbackfn(val, idx, obj) {
            return !(obj instanceof String);
        }

        var obj = new String("hello\nworld\\!");

        return !Array.prototype.every.call(obj, callbackfn);
    }
runTestCase(testcase);
