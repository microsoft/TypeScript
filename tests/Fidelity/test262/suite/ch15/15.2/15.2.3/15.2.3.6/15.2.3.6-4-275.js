/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-275.js
 * @description Object.defineProperty - 'O' is an Array, 'name' is an array index named property, test the length property of 'O' is set as ToUint32('name') + 1 if ToUint32('name') equals to value of the length property in 'O' (15.4.5.1 step 4.e.ii)
 */


function testcase() {

        var arrObj = [];
        arrObj.length = 3; // default value of length: writable: true, configurable: false, enumerable: false

        Object.defineProperty(arrObj, "3", {
            value: 3
        });

        return arrObj.length === 4 && arrObj[3] === 3;
    }
runTestCase(testcase);
