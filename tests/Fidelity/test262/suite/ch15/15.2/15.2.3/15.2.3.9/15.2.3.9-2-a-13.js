/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.9/15.2.3.9-2-a-13.js
 * @description Object.freeze - 'P' is own index property of the Object
 */


function testcase() {

        // default [[Configurable]] attribute value of "0": true
        var obj = { 0: 0, 1: 1, length: 2};

        Object.freeze(obj);

        var desc = Object.getOwnPropertyDescriptor(obj, "0");

        delete obj[0];
        return obj[0] === 0 && desc.configurable === false && desc.writable === false;
    }
runTestCase(testcase);
