/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.14/15.4.4.14-9-b-i-31.js
 * @description Array.prototype.indexOf - terminates iteration on unhandled exception on an Array-like object
 */


function testcase() {

        var accessed = false;
        var obj = { length: 2 };

        Object.defineProperty(obj, "0", {
            get: function () {
                throw new TypeError();
            },
            configurable: true
        });

        Object.defineProperty(obj, "1", {
            get: function () {
                accessed = true;
                return true;
            },
            configurable: true
        });

        try {
            Array.prototype.indexOf.call(obj, true);
            return false;
        } catch (e) {
            return (e instanceof TypeError) && !accessed;
        }

    }
runTestCase(testcase);
