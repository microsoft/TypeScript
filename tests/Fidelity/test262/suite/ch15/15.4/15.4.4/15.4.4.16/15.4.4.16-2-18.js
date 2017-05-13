/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.16/15.4.4.16-2-18.js
 * @description Array.prototype.every applied to String object, which implements its own property get method
 */


function testcase() {
        function callbackfn1(val, idx, obj) {
            return parseInt(val, 10) > 1;
        }

        function callbackfn2(val, idx, obj) {
            return parseInt(val, 10) > 2;
        }

        var str = new String("432");
        try {
            String.prototype[3] = "1";
            return Array.prototype.every.call(str, callbackfn1) &&
            !Array.prototype.every.call(str, callbackfn2);
        } finally {
            delete String.prototype[3];
        }
    }
runTestCase(testcase);
