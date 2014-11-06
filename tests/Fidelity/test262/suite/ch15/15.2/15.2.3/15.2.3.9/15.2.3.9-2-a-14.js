/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.9/15.2.3.9-2-a-14.js
 * @description Object.freeze - 'P' is own index property of an Array object that uses Object's [[GetOwnProperty]]
 */


function testcase() {

        // default [[Configurable]] attribute value of "0": true
        var arrObj = [0, 1, 2];

        Object.freeze(arrObj);

        var desc = Object.getOwnPropertyDescriptor(arrObj, "0");

        delete arrObj[0];
        return arrObj[0] === 0 && desc.configurable === false && desc.writable === false;
    }
runTestCase(testcase);
