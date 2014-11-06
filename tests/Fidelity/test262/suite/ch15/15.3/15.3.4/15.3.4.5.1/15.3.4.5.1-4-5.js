/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.3/15.3.4/15.3.4.5.1/15.3.4.5.1-4-5.js
 * @description [[Call]] - length of parameters of 'target' is 0, length of 'boundArgs' is 0, length of 'ExtraArgs' is 1, and without 'boundThis'
 */


function testcase() {
        var func = function () {
            return arguments[0] === 1;
        };

        var newFunc = Function.prototype.bind.call(func);

        return newFunc(1);
    }
runTestCase(testcase);
