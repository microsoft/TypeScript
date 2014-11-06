/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.21/15.4.4.21-8-b-1.js
 * @description Array.prototype.reduce - no observable effects occur if 'len' is 0
 */


function testcase() {

        var accessed = false;

        var obj = { length: 0 };

        Object.defineProperty(obj, "0", {
            get: function () {
                accessed = true;
                return 10;
            },
            configurable: true
        });

        try {
            Array.prototype.reduce.call(obj, function () { });
            return false;
        } catch (ex) {
            return !accessed;
        }
    }
runTestCase(testcase);
