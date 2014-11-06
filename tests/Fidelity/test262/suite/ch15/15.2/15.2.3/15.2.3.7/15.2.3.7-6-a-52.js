/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.7/15.2.3.7-6-a-52.js
 * @description Object.defineProperties - desc.value and P.value are two boolean values with different values (8.12.9 step 6)
 */


function testcase() {

        var obj = {};

        obj.foo = true; // default value of attributes: writable: true, configurable: true, enumerable: true

        Object.defineProperties(obj, {
            foo: {
                value: false
            }
        });
        return dataPropertyAttributesAreCorrect(obj, "foo", false, true, true, true);
    }
runTestCase(testcase);
