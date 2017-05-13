/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.17/15.4.4.17-7-9.js
 * @description Array.prototype.some - modifications to length don't change number of iterations
 */


function testcase() {

        var called = 0;

        function callbackfn(val, idx, obj) {
            called++;
            return val > 10;
        }

        var obj = { 0: 9, 2: 12, length: 3 };

        Object.defineProperty(obj, "1", {
            get: function () {
                obj.length = 2;
                return 8;
            },
            configurable: true
        });

        return Array.prototype.some.call(obj, callbackfn) && called === 3;
    }
runTestCase(testcase);
