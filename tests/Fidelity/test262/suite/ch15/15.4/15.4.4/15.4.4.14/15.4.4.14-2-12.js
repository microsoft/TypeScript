/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.14/15.4.4.14-2-12.js
 * @description Array.prototype.indexOf - 'length' is own accessor property without a get function that overrides an inherited accessor property
 */


function testcase() {
        try {
            Object.defineProperty(Object.prototype, "length", {
                get: function () {
                    return 20;
                },
                configurable: true
            });

            var obj = { 1: 1 };
            Object.defineProperty(obj, "length", {
                set: function () { },
                configurable: true
            });

            return Array.prototype.indexOf.call(obj, 1) === -1;
        } finally {
            delete Object.prototype.length;
        }
    }
runTestCase(testcase);
