/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.18/15.4.4.18-7-c-ii-19.js
 * @description Array.prototype.forEach - non-indexed properties are not called
 */


function testcase() {

        var accessed = false;
        var result = true;
        function callbackfn(val, idx, obj) {
            accessed = true;
            if (val === 8) {
                result = false;
            }
        }

        var obj = { 0: 11, 10: 12, non_index_property: 8, length: 20 };

        Array.prototype.forEach.call(obj, callbackfn);
        return result && accessed;
    }
runTestCase(testcase);
