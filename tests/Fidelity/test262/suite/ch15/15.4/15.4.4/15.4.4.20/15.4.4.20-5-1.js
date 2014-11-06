/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.20/15.4.4.20-5-1.js
 * @description Array.prototype.filter - thisArg is passed
 */


function testcase() {
        this._15_4_4_20_5_1 = false;
        var _15_4_4_20_5_1 = true;

        function callbackfn(val, idx, obj) {
            return this._15_4_4_20_5_1;
        }
        var srcArr = [1];
        var resArr = srcArr.filter(callbackfn);
        return resArr.length === 0;
    }
runTestCase(testcase);
