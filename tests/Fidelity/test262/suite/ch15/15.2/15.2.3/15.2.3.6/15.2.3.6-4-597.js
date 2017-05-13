/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-597.js
 * @description ES5 Attributes - Inherited property is non-enumerable (Function.prototype.bind)
 */


function testcase() {
        var foo = function () { };
        var data = "data";
        try {
            Object.defineProperty(Function.prototype, "prop", {
                get: function () {
                    return data;
                },
                enumerable: false,
                configurable: true
            });

            var obj = foo.bind({});

            var verifyEnumerable = false;
            for (var p in obj) {
                if (p === "prop") {
                    verifyEnumerable = true;
                }
            }

            return !obj.hasOwnProperty("prop") && !verifyEnumerable;
        } finally {
            delete Function.prototype.prop;
        }
    }
runTestCase(testcase);
