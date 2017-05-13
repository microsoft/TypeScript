/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.20/15.4.4.20-5-30.js
 * @description Array.prototype.filter - thisArg not passed
 */


function testcase() {
        function innerObj() {
            this._15_4_4_20_5_30 = true;
            var _15_4_4_20_5_30 = false;
            
            function callbackfn(val, idx, obj) {
                return this._15_4_4_20_5_30;
            }
            var srcArr = [1];
            var resArr = srcArr.filter(callbackfn);
            this.retVal = resArr.length === 0;
        }
        return new innerObj().retVal;
    }
runTestCase(testcase);
