/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-72.js
 * @description Object.defineProperty - desc.value and name.value are two Ojbects which refer to the different objects (8.12.9 step 6)
 */


function testcase() {

        var obj = {};

        var obj1 = { length: 10 };
        obj.foo = obj1; // default value of attributes: writable: true, configurable: true, enumerable: true

        var obj2 = { length: 20 };

        Object.defineProperty(obj, "foo", { value: obj2 });
        return dataPropertyAttributesAreCorrect(obj, "foo", obj2, true, true, true);
    }
runTestCase(testcase);
