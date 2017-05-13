/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.12/15.4.4.12-9-c-ii-1.js
 * @description Array.prototype.splice will splice an array even when Array.prototype has index '0' set to read-only and 'fromPresent' less than 'actualDeleteCount (Step 9.c.ii)
 */


function testcase() {
        try {
            var arr = ["a", "b", "c"];
            Array.prototype[0] = "test";
            var newArr = arr.splice(2, 1, "d");

            var verifyValue = false;
            verifyValue = arr.length === 3 && arr[0] === "a" && arr[1] === "b" && arr[2] === "d"
                && newArr[0] === "c" && newArr.length === 1;

            var verifyEnumerable = false;
            for (var p in newArr) {
                if (newArr.hasOwnProperty("0") && p === "0") {
                    verifyEnumerable = true;
                }
            }

            var verifyWritable = false;
            newArr[0] = 12;
            verifyWritable = newArr[0] === 12;

            var verifyConfigurable = false;
            delete newArr[0];
            verifyConfigurable = newArr.hasOwnProperty("0");

            return verifyValue && !verifyConfigurable && verifyEnumerable && verifyWritable;
        } finally {
            delete Array.prototype[0];
        }
    }
runTestCase(testcase);
