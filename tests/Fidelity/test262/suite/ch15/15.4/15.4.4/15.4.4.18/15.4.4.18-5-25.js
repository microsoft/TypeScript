/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.18/15.4.4.18-5-25.js
 * @description Array.prototype.forEach - thisArg not passed
 */


function testcase() {
        function innerObj() {
            this._15_4_4_18_5_25 = true;
            var _15_4_4_18_5_25 = false;
            var result;
            function callbackfn(val, idx, obj) {
                result = this._15_4_4_18_5_25;
            }
            var arr = [1];
            arr.forEach(callbackfn)
            this.retVal = !result;
        }
        return new innerObj().retVal;
    }
runTestCase(testcase);
