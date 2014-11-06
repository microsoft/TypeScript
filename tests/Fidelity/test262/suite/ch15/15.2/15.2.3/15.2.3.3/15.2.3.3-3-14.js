/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.3/15.2.3.3-3-14.js
 * @description Object.getOwnPropertyDescriptor applied to a String object which implements its own property get method
 */


function testcase() {

        var str = new String("123");

        var desc = Object.getOwnPropertyDescriptor(str, "2");

        return desc.value === "3";
    }
runTestCase(testcase);
