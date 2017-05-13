/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-243.js
 * @description Object.defineProperty - 'O' is an Array, 'name' is an array index named property,  'name' is accessor property and 'desc' is data descriptor, and the [[Configurable]] attribute value of 'name' is true, test 'name' is converted from accessor property to data property (15.4.5.1 step 4.c)
 */


function testcase() {

        var arrObj = [];

        function getFunc() {
            return 3;
        }
        Object.defineProperty(arrObj, "1", {
            get: getFunc,
            configurable: true
        });

        Object.defineProperty(arrObj, "1", {
            value: 12
        });

        return dataPropertyAttributesAreCorrect(arrObj, "1", 12, false, false, true);
    }
runTestCase(testcase);
