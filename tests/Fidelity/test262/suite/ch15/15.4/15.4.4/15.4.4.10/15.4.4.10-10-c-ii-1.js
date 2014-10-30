/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.10/15.4.4.10-10-c-ii-1.js
 * @description Array.prototype.slice will slice a string from start to end when index property (read-only) exists in Array.prototype (Step 10.c.ii)
 */


function testcase() {
        var arrObj = [1, 2, 3];
        try {
            Object.defineProperty(Array.prototype, "0", {
                value: "test",
                writable: false,
                configurable: true
            });

            var newArr = arrObj.slice(0, 1);
            return newArr.hasOwnProperty("0") && newArr[0] === 1 && typeof newArr[1] === "undefined";
        } finally {
            delete Array.prototype[0];
        }
    }
runTestCase(testcase);
