/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.7/15.2.3.7-6-a-269.js
 * @description Object.defineProperties - 'O' is an Array, 'P' is generic own data property of 'O', and 'desc' is data descriptor, test updating multiple attribute values of 'P' (15.4.5.1 step 5)
 */


function testcase() {

        var arr = [];
        arr.property = 12; // default value of attributes: writable: true, configurable: true, enumerable: true

        Object.defineProperties(arr, {
            "property": {
                writable: false,
                enumerable: false,
                configurable: false
            }
        });
        return dataPropertyAttributesAreCorrect(arr, "property", 12, false, false, false) && arr.length === 0;
    }
runTestCase(testcase);
