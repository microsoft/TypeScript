/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.20/15.4.4.20-1-3.js
 * @description Array.prototype.filter applied to boolean primitive
 */


function testcase() {
        function callbackfn(val, idx, obj) {
            return obj instanceof Boolean;
        }

        try {
            Boolean.prototype[0] = true;
            Boolean.prototype.length = 1;

            var newArr = Array.prototype.filter.call(false, callbackfn);
            return newArr[0] === true;

        } finally {
            delete Boolean.prototype[0];
            delete Boolean.prototype.length;
        }
    }
runTestCase(testcase);
