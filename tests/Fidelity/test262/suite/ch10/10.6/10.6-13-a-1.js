/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch10/10.6/10.6-13-a-1.js
 * @description In non-strict mode, arguments object should have its own 'callee' property defined (Step 13.a)
 */


function testcase() {
        try {
            Object.defineProperty(Object.prototype, "callee", {
                value: 1,
                writable: false,
                configurable: true
            });

            var argObj = (function () { return arguments })();

            var verifyValue = false;
            verifyValue = typeof argObj.callee === "function";
            
            var verifyWritable = false;
            argObj.callee = 1001;
            verifyWritable = (argObj.callee === 1001);

            var verifyEnumerable = false;
            for (var p in argObj) {
                if (p === "callee" && argObj.hasOwnProperty("callee")) {
                    verifyEnumerable = true;
                }
            }

            var verifyConfigurable = false;
            delete argObj.callee;
            verifyConfigurable = argObj.hasOwnProperty("callee");

            return verifyValue && verifyWritable && !verifyEnumerable && !verifyConfigurable;
        } finally {
            delete Object.prototype.callee;
        }
    }
runTestCase(testcase);
