/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch13/13.2/13.2-18-1.js
 * @description Function Object has 'prototype' as its own property, it is not enumerable and does not invoke the setter defined on Function.prototype (Step 18)
 */


function testcase() {
        try {
            var getFunc = function () {
                return 100;
            };

            var data = "data";
            var setFunc = function (value) {
                data = value;
            };
            Object.defineProperty(Function.prototype, "prototype", {
                get: getFunc,
                set: setFunc,
                configurable: true
            });

            var fun = function () { };

            var verifyValue = false;
            verifyValue = (fun.prototype !== 100 && fun.prototype.toString() === "[object Object]");

            var verifyEnumerable = false;
            for (var p in fun) {
                if (p === "prototype" && fun.hasOwnProperty("prototype")) {
                    verifyEnumerable = true;
                }
            }

            var verifyConfigurable = false;
            delete fun.prototype;
            verifyConfigurable = fun.hasOwnProperty("prototype");

            var verifyWritable = false;
            fun.prototype = 12
            verifyWritable = (fun.prototype === 12);

            return verifyValue && verifyWritable && !verifyEnumerable && verifyConfigurable && data === "data";
        } finally {
            delete Function.prototype.prototype;
        }
    }
runTestCase(testcase);
