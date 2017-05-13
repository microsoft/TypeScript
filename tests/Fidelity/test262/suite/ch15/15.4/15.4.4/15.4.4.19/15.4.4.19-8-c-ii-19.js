/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.19/15.4.4.19-8-c-ii-19.js
 * @description Array.prototype.map - non-indexed properties are not called.
 */


function testcase() {

        var called = 0;
        var result = false;

        function callbackfn(val, idx, obj) {
            called++;
            if (val === 11) {
                result = true;
            }
            return true;
        }

        var obj = { 0: 9, non_index_property: 11, length: 20 };

        var testResult = Array.prototype.map.call(obj, callbackfn);

        return !result && testResult[0] === true && called === 1;
    }
runTestCase(testcase);
