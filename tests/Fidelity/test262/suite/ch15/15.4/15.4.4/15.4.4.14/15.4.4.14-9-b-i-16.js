/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.14/15.4.4.14-9-b-i-16.js
 * @description Array.prototype.indexOf - element to be retrieved is inherited accessor property on an Array-like object
 */


function testcase() {

        try {
            Object.defineProperty(Object.prototype, "0", {
                get: function () {
                    return 10;
                },
                configurable: true
            });

            Object.defineProperty(Object.prototype, "1", {
                get: function () {
                    return 20;
                },
                configurable: true
            });

            Object.defineProperty(Object.prototype, "2", {
                get: function () {
                    return 30;
                },
                configurable: true
            });

            return 0 === Array.prototype.indexOf.call({ length: 3 }, 10) &&
                1 === Array.prototype.indexOf.call({ length: 3 }, 20) &&
                2 === Array.prototype.indexOf.call({ length: 3 }, 30);
        } finally {
            delete Object.prototype[0];
            delete Object.prototype[1];
            delete Object.prototype[2];
        }
    }
runTestCase(testcase);
