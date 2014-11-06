/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.20/15.4.4.20-9-c-ii-19.js
 * @description Array.prototype.filter - non-indexed properties are not called
 */


function testcase() {

        var accessed = false;

        function callbackfn(val, idx, obj) {
            accessed = true;
            return val === 8;
        }

        var obj = { 0: 11, non_index_property: 8, 2: 5, length: 20 };
        var newArr = Array.prototype.filter.call(obj, callbackfn);

        return newArr.length === 0 && accessed;
    }
runTestCase(testcase);
