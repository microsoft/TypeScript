/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.19/15.4.4.19-8-7.js
 * @description Array.prototype.map successful to delete the object in callbackfn
 */


function testcase() {
        var obj = {};
        obj.srcArr = [1, 2, 3, 4, 5];

        function callbackfn(val, idx, obj) {
            delete obj.srcArr;
            if (val > 0)
                return 1;
            else
                return 0;
        }

        var resArr = obj.srcArr.map(callbackfn);
        return resArr.toString() === "1,1,1,1,1" && !obj.hasOwnProperty("arr");
    }
runTestCase(testcase);
