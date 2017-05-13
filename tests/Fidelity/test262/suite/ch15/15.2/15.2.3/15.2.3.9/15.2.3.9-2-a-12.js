/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.9/15.2.3.9-2-a-12.js
 * @description Object.freeze - 'P' is own index property of a String object that implements its own [[GetOwnProperty]]
 */


function testcase() {

        // default [[Configurable]] attribute value of "0": true
        var strObj = new String("abc");

        Object.freeze(strObj);

        var desc = Object.getOwnPropertyDescriptor(strObj, "0");

        delete strObj[0];
        return strObj[0] === "a" && desc.configurable === false && desc.writable === false;
    }
runTestCase(testcase);
