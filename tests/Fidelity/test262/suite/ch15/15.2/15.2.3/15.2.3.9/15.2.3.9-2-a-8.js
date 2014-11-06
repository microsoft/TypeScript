/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.9/15.2.3.9-2-a-8.js
 * @description Object.freeze - 'P' is own named property of the String object that implements its own [[GetOwnProperty]]
 */


function testcase() {
        var strObj = new String("abc");

        strObj.foo = 10; // default [[Configurable]] attribute value of foo: true

        Object.freeze(strObj);

        var desc = Object.getOwnPropertyDescriptor(strObj, "foo");

        delete strObj.foo;
        return strObj.foo === 10 && desc.configurable === false && desc.writable === false;
    }
runTestCase(testcase);
