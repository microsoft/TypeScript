/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.15/15.4.4.15-5-22.js
 * @description Array.prototype.lastIndexOf - value of 'fromIndex' which is an object, and has an own valueOf method
 */


function testcase() {

        var fromIndex = {
            valueOf: function () {
                return 2;
            }
        };

        var targetObj = function () {};
        return [0, true, targetObj, 3, false].lastIndexOf(targetObj, fromIndex) === 2 &&
        [0, true, 3, targetObj, false].lastIndexOf(targetObj, fromIndex) === -1;
    }
runTestCase(testcase);
