/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.3/15.3.4/15.3.4.5.1/15.3.4.5.1-4-2.js
 * @description [[Call]] - 'F''s [[BoundThis]] is used as the 'this' value of calling the [[Call]] internal method of 'F''s [[TargetFunction]] when 'F' is called
 */


function testcase() {
        var obj = { "prop": "a" };

        var func = function () {
            return this;
        };

        var newFunc = Function.prototype.bind.call(func, obj);

        return newFunc() === obj;
    }
runTestCase(testcase);
