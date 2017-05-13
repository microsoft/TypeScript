/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.3/15.3.4/15.3.4.5/15.3.4.5-6-11.js
 * @description Function.prototype.bind - F can get inherited accessor property without a get function
 */


function testcase() {

        var foo = function () { };

        var obj = foo.bind({});
        try {
            Object.defineProperty(Function.prototype, "property", {
                set: function () { },
                configurable: true
            });
            return typeof (obj.property) === "undefined";
        } finally {
            delete Function.prototype.property;
        }
    }
runTestCase(testcase);
