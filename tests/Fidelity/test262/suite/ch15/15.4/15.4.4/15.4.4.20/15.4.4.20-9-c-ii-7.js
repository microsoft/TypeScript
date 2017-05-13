/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.20/15.4.4.20-9-c-ii-7.js
 * @description Array.prototype.filter - unhandled exceptions happened in callbackfn terminate iteration
 */


function testcase() {

        var called = 0;

        function callbackfn(val, idx, obj) {
            called++;
            if (called === 1) {
                throw new Error("Exception occurred in callbackfn");
            }
            return true;
        }

        var obj = { 0: 11, 4: 10, 10: 8, length: 20 };

        try {
            Array.prototype.filter.call(obj, callbackfn);
            return false;
        } catch (ex) {
            return 1 === called && ex instanceof Error;
        }
    }
runTestCase(testcase);
