/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.18/15.4.4.18-7-c-ii-16.js
 * @description Array.prototype.forEach - 'this' of 'callbackfn' is a Boolean object when T is not an object (T is a boolean)
 */


function testcase() {

        var result = false;
        function callbackfn(val, idx, obj) {
            result = (this.valueOf() !== false);
        }

        var obj = { 0: 11, length: 2 };

        Array.prototype.forEach.call(obj, callbackfn, false);
        return !result;
    }
runTestCase(testcase);
