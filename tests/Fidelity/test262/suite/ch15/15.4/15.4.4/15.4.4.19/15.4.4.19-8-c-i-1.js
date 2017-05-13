/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.19/15.4.4.19-8-c-i-1.js
 * @description Array.prototype.map - element to be retrieved is own data property on an Array-like object
 */


function testcase() {

        var kValue = {};

        function callbackfn(val, idx, obj) {
            if (idx === 5) {
                return val === kValue;
            }
            return false;
        }

        var obj = { 5: kValue, length: 100 };

        var newArr = Array.prototype.map.call(obj, callbackfn);

        return newArr[5] === true;
    }
runTestCase(testcase);
