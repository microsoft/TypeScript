/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.18/15.4.4.18-7-c-ii-23.js
 * @description Array.prototype.forEach - callbackfn called with correct parameters (this object O is correct)
 */


function testcase() {

        var result = false;
        var obj = { 0: 11, length: 2 };

        function callbackfn(val, idx, o) {
            result = (obj === o);
        }

        Array.prototype.forEach.call(obj, callbackfn);
        return result;
    }
runTestCase(testcase);
