/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.15/15.4.4.15-8-b-ii-9.js
 * @description Array.prototype.lastIndexOf - both array element and search element are strings, and they have exactly the same sequence of characters
 */


function testcase() {

        return ["abc", "ab", "bca", ""].lastIndexOf("abc") === 0;
    }
runTestCase(testcase);
