/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.7/15.2.3.7-6-a-114.js
 * @description Object.defineProperties - 'O' is an Array, 'P' is the length property of 'O', the [[Value]] field of 'desc' is absent, test every field in 'desc' is absent (15.4.5.1 step 3.a.i)
 */


function testcase() {
        var arr = [];

        Object.defineProperties(arr, { length: {} });

        var verifyValue = false;
        verifyValue = (arr.length === 0);

        var verifyWritable = false;
        arr.length = 2;
        verifyWritable = (arr.length === 2);

        var verifyEnumerable = false;
        for (var p in arr) {
            if (p === "length") {
                verifyEnumerable = true;
            }
        }

        var verifyConfigurable = false;
        delete arr.length;
        verifyConfigurable = arr.hasOwnProperty("length");

        return verifyValue && verifyWritable && !verifyEnumerable && verifyConfigurable;
    }
runTestCase(testcase);
