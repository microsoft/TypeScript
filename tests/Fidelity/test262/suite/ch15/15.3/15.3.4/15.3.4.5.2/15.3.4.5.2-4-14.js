/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.3/15.3.4/15.3.4.5.2/15.3.4.5.2-4-14.js
 * @description [[Construct]] - length of parameters of 'target' is 1, length of 'boundArgs' is 2, length of 'ExtraArgs' is 0
 */


function testcase() {
        var func = function (x) {
            return new Boolean(arguments.length === 2 && x === 1 && arguments[1] === 2 && arguments[0] === 1);
        };

        var NewFunc = Function.prototype.bind.call(func, {}, 1, 2);

        var newInstance = new NewFunc();

        return newInstance.valueOf() === true;
    }
runTestCase(testcase);
