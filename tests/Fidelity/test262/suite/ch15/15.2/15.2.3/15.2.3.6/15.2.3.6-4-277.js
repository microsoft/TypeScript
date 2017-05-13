/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-277.js
 * @description Object.defineProperty -  'O' is an Array, 'name' is generic property that won't exist on 'O', and 'desc' is data descriptor, test 'name' is defined in 'O' with all correct attribute values (15.4.5.1 step 5)
 */


function testcase() {

        var arrObj = [];

        Object.defineProperty(arrObj, "property", {
            value: 12,
            writable: true,
            enumerable: true,
            configurable: true
        });

        return dataPropertyAttributesAreCorrect(arrObj, "property", 12, true, true, true);
    }
runTestCase(testcase);
