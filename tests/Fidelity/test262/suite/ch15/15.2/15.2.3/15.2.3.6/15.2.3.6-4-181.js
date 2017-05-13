/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-181.js
 * @description Object.defineProperty - 'O' is an Array, 'name' is the length property of 'O', the [[Value]] field of 'desc' is less than value of  the length property, test the [[Writable]] attribute of the length property is set to false at last when the [[Writable]] field of 'desc' is false and 'O' doesn't contain non-configurable large index named property (15.4.5.1 step 3.m)
 */


function testcase() {

        var arrObj = [0, 1];

        Object.defineProperty(arrObj, "length", {
            value: 0,
            writable: false
        });
            
        arrObj.length = 10; //try to overwrite length value of arr
        return !arrObj.hasOwnProperty("1") && arrObj.length === 0;
    }
runTestCase(testcase);
