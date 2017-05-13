/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.15/15.4.4.15-8-b-ii-11.js
 * @description Array.prototype.lastIndexOf - both array element and search element are Objects, and they refer to the same object
 */


function testcase() {

        var obj1 = {};
        var obj2 = {};
        var obj3 = obj2;
        return [obj2, obj1].lastIndexOf(obj3) === 0;
    }
runTestCase(testcase);
