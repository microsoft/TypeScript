/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.21/15.4.4.21-2-12.js
 * @description Array.prototype.reduce - 'length' is own accessor property without a get function that overrides an inherited accessor property on an Array
 */


function testcase() {

        var accessed = false;
        function callbackfn(prevVal, curVal, idx, obj) {
            accessed = true;
        }

        try {
            Object.defineProperty(Object.prototype, "length", {
                get: function () {
                    return 2;
                },
                configurable: true
            });

            var obj = { 0: 12, 1: 11 };
            Object.defineProperty(obj, "length", {
                set: function () { },
                configurable: true
            });

            return Array.prototype.reduce.call(obj, callbackfn, 1) === 1 && !accessed;
        } finally {
            delete Object.prototype.length;
        }

    }
runTestCase(testcase);
