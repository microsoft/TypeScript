/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.15/15.4.4.15-8-a-9.js
 * @description Array.prototype.lastIndexOf -  properties can be added to prototype after current position are visited on an Array-like object
 */


function testcase() {

        var arr = { length: 9 };

        Object.defineProperty(arr, "4", {
            get: function () {
                Object.defineProperty(Object.prototype, "1", {
                    get: function () {
                        return Infinity;
                    },
                    configurable: true
                });
                return 0;
            },
            configurable: true
        });

        try {
            return Array.prototype.lastIndexOf.call(arr, Infinity) === 1;
        } finally {
            delete Object.prototype[1];
        }
    }
runTestCase(testcase);
