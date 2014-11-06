/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.21/15.4.4.21-8-b-2.js
 * @description Array.prototype.reduce - modifications to length don't change number of iterations in step 9
 */


function testcase() {

        function callbackfn(prevVal, curVal, idx, obj) {
            return idx;
        }

        var obj = { 3: 12, 4: 9, length: 4 };

        Object.defineProperty(obj, "2", {
            get: function () {
                obj.length = 10;
                return 11;
            },
            configurable: true
        });

        return Array.prototype.reduce.call(obj, callbackfn) === 3;
    }
runTestCase(testcase);
