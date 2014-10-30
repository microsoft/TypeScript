/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.19/15.4.4.19-8-c-i-8.js
 * @description Array.prototype.map - element to be retrieved is inherited data property on an Array
 */


function testcase() {
        function callbackfn(val, idx, obj) {
            if (idx === 1) {
                return val === 13;
            }
            return false;
        }

        try {
            Array.prototype[1] = 13;

            var newArr = [, , , ].map(callbackfn);

            return newArr[1] === true;
        } finally {
            delete Array.prototype[1];
        }
    }
runTestCase(testcase);
