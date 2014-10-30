/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.15/15.4.4.15-5-6.js
 * @description Array.prototype.lastIndexOf when 'fromIndex' isn't passed
 */


function testcase() {
        var arr = [0, 1, 2, 3, 4];
        //'fromIndex' will be set as 4 if not passed by default
        return arr.lastIndexOf(0) === arr.lastIndexOf(0, 4) &&
            arr.lastIndexOf(2) === arr.lastIndexOf(2, 4) &&
            arr.lastIndexOf(4) === arr.lastIndexOf(4, 4);
    }
runTestCase(testcase);
