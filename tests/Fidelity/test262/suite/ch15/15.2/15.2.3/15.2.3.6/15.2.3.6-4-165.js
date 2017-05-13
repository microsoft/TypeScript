/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-165.js
 * @description Object.defineProperty - 'O' is an Array, 'name' is the length property of 'O', the [[Value]] field of 'desc' is less than value of  the length property,  test the [[Writable]] attribute of the length property is set to true after deleting properties with large index named if the [[Writable]] field of 'desc' is absent (15.4.5.1 step 3.h)
 */


function testcase() {

        var arrObj = [0, 1];

        Object.defineProperty(arrObj, "length", {
            value: 1
        });

        var indexDeleted = !arrObj.hasOwnProperty("1");

        arrObj.length = 10;

        return indexDeleted && arrObj.length === 10;
    }
runTestCase(testcase);
