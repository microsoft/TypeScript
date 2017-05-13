/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.17/15.4.4.17-5-17.js
 * @description Array.prototype.some - the JSON object can be used as thisArg
 */


function testcase() {

        function callbackfn(val, idx, obj) {
            return this === JSON;
        }

        return [11].some(callbackfn, JSON);
    }
runTestCase(testcase);
