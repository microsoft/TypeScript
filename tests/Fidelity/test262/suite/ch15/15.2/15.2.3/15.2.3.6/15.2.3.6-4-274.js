/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-274.js
 * @description Object.defineProperty - 'O' is an Array, 'name' is an array index named property, test the length property of 'O' is not changed if ToUint32('name') is less than value of the length property in 'O' (15.4.5.1 step 4.e)
 */


function testcase() {

        var arrObj = [];
        arrObj.length = 3; // default value of length: writable: true, configurable: false, enumerable: false

        Object.defineProperty(arrObj, "1", {
            value: 14
        });

        return arrObj.length === 3 && arrObj[1] === 14;
    }
runTestCase(testcase);
