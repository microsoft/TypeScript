/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-67.js
 * @description Object.defineProperty - both desc.value and name.value are two strings which have same length and same characters in corresponding positions (8.12.9 step 6)
 */


function testcase() {

        var obj = {};

        Object.defineProperty(obj, "foo", { value: "abcd" });

        Object.defineProperty(obj, "foo", { value: "abcd" });
        return dataPropertyAttributesAreCorrect(obj, "foo", "abcd", false, false, false);
    }
runTestCase(testcase);
