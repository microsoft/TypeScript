/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-417.js
 * @description ES5 Attributes - [[Value]] attribute of inherited property of [[Prototype]] internal property is correct(Function.prototype.bind)
 */


function testcase() {
        var foo = function () { };
        try {
            Object.defineProperty(Function.prototype, "prop", {
                value: 1001,
                writable: true,
                enumerable: true,
                configurable: true
            });

            var obj = foo.bind({});

            return !obj.hasOwnProperty("prop") && obj.prop === 1001;
        } finally {
            delete Function.prototype.prop;
        }
    }
runTestCase(testcase);
