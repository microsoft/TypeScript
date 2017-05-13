/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch10/10.6/10.6-11-b-1.js
 * @description Arguments Object has index property '0' as its own property, it shoulde be writable, enumerable, configurable and does not invoke the setter defined on Object.prototype[0] (Step 11.b)
 */


function testcase() {
        try {
            var data = "data";
            var getFunc = function () {
                return data;
            };

            var setFunc = function (value) {
                data = value;
            };

            Object.defineProperty(Object.prototype, "0", {
                get: getFunc,
                set: setFunc,
                configurable: true
            });

            var argObj = (function () { return arguments })(1);

            var verifyValue = false;
            verifyValue = (argObj[0] === 1);

            var verifyEnumerable = false;
            for (var p in argObj) {
                if (p === "0" && argObj.hasOwnProperty("0")) {
                    verifyEnumerable = true;
                }
            }

            var verifyWritable = false;
            argObj[0] = 1001;
            verifyWritable = (argObj[0] === 1001);

            var verifyConfigurable = false;
            delete argObj[0];
            verifyConfigurable = argObj.hasOwnProperty("0");

            return verifyValue && verifyWritable && verifyEnumerable && !verifyConfigurable && data === "data";
        } finally {
            delete Object.prototype[0];
        }
    }
runTestCase(testcase);
