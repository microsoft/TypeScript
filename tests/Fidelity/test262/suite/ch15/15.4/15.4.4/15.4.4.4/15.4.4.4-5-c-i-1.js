/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.4/15.4.4.4-5-c-i-1.js
 * @description Array.prototype.concat will concat an Array when index property (read-only) exists in Array.prototype (Step 5.c.i)
 */


function testcase() {
        try {
            Object.defineProperty(Array.prototype, "0", {
                value: 100,
                writable: false,
                configurable: true
            });

            var newArr = Array.prototype.concat.call(101);

            var hasProperty = newArr.hasOwnProperty("0");

	    var instanceOfVerify = typeof newArr[0]==="object";
            
            var verifyValue = false;
            verifyValue = newArr[0] == 101;

            var verifyEnumerable = false;
            for (var p in newArr) {
                if (p === "0" && newArr.hasOwnProperty("0")) {
                    verifyEnumerable = true;
                }
            }

            var verifyWritable = false;
            newArr[0] = 12;
            verifyWritable = newArr[0] === 12;

            var verifyConfigurable = false;
            delete newArr[0];
            verifyConfigurable = newArr.hasOwnProperty("0");

            return hasProperty && instanceOfVerify && verifyValue && !verifyConfigurable && verifyEnumerable && verifyWritable;
	

        } finally {
            delete Array.prototype[0];
        }
    }
runTestCase(testcase);
