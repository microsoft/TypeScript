/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch10/10.6/10.6-7-1.js
 * @description Arguments Object has length as its own property and does not invoke the setter defined on Object.prototype.length (Step 7)
 */


function testcase() {
        try {
            var data = "data";
            var getFunc = function () {
                return 12;
            };

            var setFunc = function (value) {
                data = value;
            };

            Object.defineProperty(Object.prototype, "length", {
                get: getFunc,
                set: setFunc,
                configurable: true
            });

            var verifyValue = false;
            var argObj = (function () { return arguments })();
            verifyValue = (argObj.length === 0);

            var verifyWritable = false;
            argObj.length = 1001;
            verifyWritable = (argObj.length === 1001);

            var verifyEnumerable = false;
            for (var p in argObj) {
                if (p === "length") {
                    verifyEnumerable = true;
                }
            }

            var verifyConfigurable = false;
            delete argObj.length;
            verifyConfigurable = argObj.hasOwnProperty("length");

            return verifyValue && verifyWritable && !verifyEnumerable && !verifyConfigurable && data === "data";
        } finally {
            delete Object.prototype.length;
        }
    }
runTestCase(testcase);
