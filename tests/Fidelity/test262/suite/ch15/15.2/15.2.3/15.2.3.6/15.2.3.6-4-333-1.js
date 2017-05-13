/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-333-1.js
 * @description Object.defineProperty will update [[Value]] attribute of named property 'P' successfully when [[Configurable]] attribute is false, [[Writable]] attribute is true and 'O' is an Object object (8.12.9 - step 10)
 */


function testcase() {

        var obj = {};

        Object.defineProperty(obj, "property", {
            value: 1001,
            writable: true,
            configurable: false
        });

        Object.defineProperty(obj, "property", {
            value: 1002
        });

        return dataPropertyAttributesAreCorrect(obj, "property", 1002, true, false, false);
    }
runTestCase(testcase);
