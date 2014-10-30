/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-217.js
 * @description Object.defineProperty - 'O' is an Array, 'name' is an array index property, both the [[Value]] field of 'desc' and the [[Value]] attribute value of 'name' are NaN  (15.4.5.1 step 4.c)
 */


function testcase() {
        var arrObj = [];

        Object.defineProperty(arrObj, "0", { value: NaN });

        Object.defineProperty(arrObj, "0", { value: NaN });

        var hasProperty = arrObj.hasOwnProperty("0");
        var verifyValue = (arrObj[0] !== arrObj[0]);

        var verifyWritable = false;
        arrObj[0] = 1001;
        verifyWritable = arrObj[0] !== 1001 && arrObj[0] !== arrObj[0];

        var verifyEnumerable = false;
        for (var p in arrObj) {
            if (p === "0") {
                verifyEnumerable = true;
            }
        }

        var verifyConfigurable = false;
        delete arrObj[0];
        verifyConfigurable = arrObj.hasOwnProperty("0");

        return hasProperty && verifyValue && verifyWritable && !verifyEnumerable && verifyConfigurable;
    }
runTestCase(testcase);
