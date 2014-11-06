/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch13/13.2/13.2-17-1.js
 * @description Function Object has 'constructor' as its own property, it is not enumerable and does not invoke the setter defined on Function.prototype.constructor (Step 17)
 */


function testcase() {
        var desc = Object.getOwnPropertyDescriptor(Object.prototype, "constructor");
        try {
            var getFunc = function () {
                return 100;
            };

            var data = "data";
            var setFunc = function (value) {
                data = value;
            };

            Object.defineProperty(Object.prototype, "constructor", {
                get: getFunc,
                set: setFunc,
                configurable: true
            });

            var fun = function () {};

            var verifyValue = false;
            verifyValue = typeof fun.prototype.constructor === "function";

            var verifyEnumerable = false;
            for (var p in fun.prototype) {
                if (p === "constructor" && fun.prototype.hasOwnProperty("constructor")) {
                    verifyEnumerable = true;
                }
            }

            var verifyWritable = false;
            fun.prototype.constructor = 12;
            verifyWritable = (fun.prototype.constructor === 12);

            var verifyConfigurable = false;
            delete fun.prototype.constructor;
            verifyConfigurable = fun.hasOwnProperty("constructor");

            return verifyValue && verifyWritable && !verifyEnumerable && !verifyConfigurable && data === "data";
        } finally {
            Object.defineProperty(Object.prototype, "constructor", desc);
        }
    }
runTestCase(testcase);
