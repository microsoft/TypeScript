/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.20/15.4.4.20-9-c-iii-1-3.js
 * @description Array.prototype.filter - value of returned array element can be enumerated
 */


function testcase() {

        function callbackfn(val, idx, obj) {
            return true;
        }

        var obj = { 0: 11, length: 2 };
        var newArr = Array.prototype.filter.call(obj, callbackfn);

        var prop;
        var enumerable = false;
        for (prop in newArr) {
            if (newArr.hasOwnProperty(prop)) {
                if (prop === "0") {
                    enumerable = true;
                }
            }
        }

        return enumerable;
    }
runTestCase(testcase);
