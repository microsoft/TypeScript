/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-82-4.js
 * @description Object.defineProperty - Update [[Configurable]] attribute of 'name' property to false successfully when [[Enumerable]] and [[Configurable]] attributes of 'name' property are true,  the 'desc' is a generic descriptor which contains [[Enumerable]] attribute as true and [[Configurable]] attribute as false, 'name' property is a data property (8.12.9 step 8)
 */


function testcase() {
    
        var obj = {};

        Object.defineProperty(obj, "foo", {
            value: 1001,
            writable: true,
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(obj, "foo", {
            enumerable: true, 
            configurable: false
        });

        return dataPropertyAttributesAreCorrect(obj, "foo", 1001, true, true, false);
    }
runTestCase(testcase);
