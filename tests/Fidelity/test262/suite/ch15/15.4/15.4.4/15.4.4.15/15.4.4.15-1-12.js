/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.15/15.4.4.15-1-12.js
 * @description Array.prototype.lastIndexOf applied to RegExp object
 */


function testcase() {

        var obj = new RegExp("afdasf");
        obj.length = 100;
        obj[1] = "afdasf";

        return Array.prototype.lastIndexOf.call(obj, "afdasf") === 1;
    }
runTestCase(testcase);
