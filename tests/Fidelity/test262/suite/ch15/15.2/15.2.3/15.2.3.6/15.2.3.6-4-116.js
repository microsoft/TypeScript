/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-116.js
 * @description Object.defineProperty - 'O' is an Array, test the length property of 'O' is own data property (15.4.5.1 step 1)
 */


function testcase() {

        var arrObj = [0, 1];
        Object.defineProperty(arrObj, "1", {
            value: 1,
            configurable: false
        });
        try {
            Object.defineProperty(arrObj, "length", { value: 1 });
            return false;
        } catch (e) {
            var desc = Object.getOwnPropertyDescriptor(arrObj, "length");

            return Object.hasOwnProperty.call(arrObj, "length") && desc.value === 2 &&
                desc.writable === true && desc.configurable === false && desc.enumerable === false;
        }
    }
runTestCase(testcase);
