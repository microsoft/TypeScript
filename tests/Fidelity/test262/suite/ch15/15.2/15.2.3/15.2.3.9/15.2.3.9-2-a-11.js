/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.9/15.2.3.9-2-a-11.js
 * @description Object.freeze - 'P' is own index property of the Arguments object that implements its own [[GetOwnProperty]]
 */


function testcase() {

        // default [[Configurable]] attribute value of "0": true
        var argObj = (function () { return arguments; }(1, 2, 3));

        Object.freeze(argObj);

        var desc = Object.getOwnPropertyDescriptor(argObj, "0");

        delete argObj[0];
        return argObj[0] === 1 && desc.configurable === false && desc.writable === false;
    }
runTestCase(testcase);
