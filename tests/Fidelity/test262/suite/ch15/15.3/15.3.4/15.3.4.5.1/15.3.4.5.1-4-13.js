/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.3/15.3.4/15.3.4.5.1/15.3.4.5.1-4-13.js
 * @description [[Call]] - length of parameters of 'target' is 1, length of 'boundArgs' is 1, length of 'ExtraArgs' is 0, and with 'boundThis'
 */


function testcase() {
        var obj = { prop: "abc" };

        var func = function (x) {
            return this === obj && x === 1 &&
                arguments[0] === 1 && arguments.length === 1 && this.prop === "abc";
        };

        var newFunc = Function.prototype.bind.call(func, obj, 1);

        return newFunc();
    }
runTestCase(testcase);
