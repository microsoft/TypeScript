/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.21/15.4.4.21-8-b-iii-1-32.js
 * @description Array.prototype.reduce - exception in getter terminates iteration on an Array-like object
 */


function testcase() {

        var accessed = false;
        var testResult = false;
        function callbackfn(prevVal, curVal, idx, obj) {
            if (idx >= 1) {
                accessed = true;
                testResult = (prevVal === 0);
            }
        }

        var obj = { 2: 2, 1: 1, length: 3 };
        Object.defineProperty(obj, "0", {
            get: function () {
                throw new RangeError("unhandle exception happened in getter");
            },
            configurable: true
        });

        try {
            Array.prototype.reduce.call(obj, callbackfn);
            return false;
        } catch (ex) {
            return (ex instanceof RangeError) && !accessed && !testResult;
        }
    }
runTestCase(testcase);
