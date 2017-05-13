/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.17/15.4.4.17-7-c-i-29.js
 * @description Array.prototype.some - element changed by getter on previous iterations on an Array-like object
 */


function testcase() {

        function callbackfn(val, idx, obj) {
            if (idx === 1) {
                return val === 12;
            }
            return false;
        }

        var obj = { length: 2 };
        var helpVerifyVar = 11;

        Object.defineProperty(obj, "1", {
            get: function () {
                return helpVerifyVar;
            },
            set: function (args) {
                helpVerifyVar = args;
            },
            configurable: true
        });

        Object.defineProperty(obj, "0", {
            get: function () {
                obj[1] = 12;
                return 11;
            },
            configurable: true
        });

        return Array.prototype.some.call(obj, callbackfn);
    }
runTestCase(testcase);
