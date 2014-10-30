/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.12/15.4.4.12-9-a-1.js
 * @description Array.prototype.splice - 'from' is the result of ToString(actualStart+k) in an Array
 */


function testcase() {
        var arrObj = [1, 2, 3];
        var newArrObj = arrObj.splice(-2, 1);
        return newArrObj.length === 1 && newArrObj[0] === 2;
    }
runTestCase(testcase);
