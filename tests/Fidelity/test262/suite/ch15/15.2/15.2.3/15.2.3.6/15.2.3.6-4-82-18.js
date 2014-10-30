/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-82-18.js
 * @description Object.defineProperty - Update [[Enumerable]] attribute of 'name' property to true successfully when [[Enumerable]] attribute of 'name' is false and [[Configurable]] attribute of 'name' is true,  the 'desc' is a generic descriptor which only contains [[Enumerable]] attribute as true, 'name' property is an index data property (8.12.9 step 8)
 */


function testcase() {
    
        var obj = {};

        Object.defineProperty(obj, "0", {
            value: 1001,
            writable: true,
            enumerable: false,
            configurable: true
        });

        Object.defineProperty(obj, "0", {
            enumerable: true
        });

        return dataPropertyAttributesAreCorrect(obj, "0", 1001, true, true, true);
    }
runTestCase(testcase);
