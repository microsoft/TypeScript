/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.3/15.3.4/15.3.4.5.2/15.3.4.5.2-4-1.js
 * @description [[Construct]] - 'F''s [[BoundArgs]] is used as the former part of arguments of calling the [[Construct]] internal method of 'F''s [[TargetFunction]] when 'F' is called as constructor
 */


function testcase() {
        var func = function (x, y, z) {
            var objResult = {};
            objResult.returnValue = x + y + z;
            objResult.returnVerifyResult = arguments[0] === "a" && arguments.length === 3;
            return objResult;
        };

        var NewFunc = Function.prototype.bind.call(func, {}, "a", "b", "c");

        var newInstance = new NewFunc();

        return newInstance.hasOwnProperty("returnValue") && newInstance.returnValue === "abc" &&
            newInstance.hasOwnProperty("returnVerifyResult") && newInstance.returnVerifyResult === true;
    }
runTestCase(testcase);
