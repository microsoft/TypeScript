/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-411.js
 * @description ES5 Attributes - Inherited property whose [[Enumerable]] attribute is set to false is non-enumerable (Math)
 */


function testcase() {
        try {
            Object.defineProperty(Object.prototype, "prop", {
                value: 1001,
                writable: false,
                enumerable: false,
                configurable: true
            });

            var verifyEnumerable = false;
            for (var p in Math) {
                if (p === "prop") {
                    verifyEnumerable = true;
                }
            }

            return !Math.hasOwnProperty("prop") && !verifyEnumerable;
        } finally {
            delete Object.prototype.prop;
        }
    }
runTestCase(testcase);
