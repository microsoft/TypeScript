/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-333-2.js
 * @description Object.defineProperty will update [[Value]] attribute of indexed property 'P' successfully when [[Configurable]] attribute is false, [[Writable]] attribute is true and 'A' is an Array object (8.12.9 - step 10)
 */


function testcase() {

        var obj = [];

        Object.defineProperty(obj, "0", {
            value: 1001,
            writable: true,
            configurable: false
        });

        Object.defineProperty(obj, "0", {
            value: 1002
        });

        return dataPropertyAttributesAreCorrect(obj, "0", 1002, true, false, false);
    }
runTestCase(testcase);
