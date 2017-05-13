/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch07/7.3/7.3-15.js
 * @description 7.3 - ES5 recognize <BOM> (\uFFFF) as a whitespace character
 */


function testcase() {
        var prop = "a\uFFFFa";
        return prop.length === 3 && prop !== "aa" && prop[1] === "\uFFFF";
    }
runTestCase(testcase);
