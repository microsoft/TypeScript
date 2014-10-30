/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.7/15.2.3.7-6-a-45.js
 * @description Object.defineProperties - desc.value is +0 and P.value is -0 (8.12.9 step 6)
 */


function testcase() {

        var obj = {};

        var desc = { value: -0 };
        Object.defineProperty(obj, "foo", desc);

        try {
            Object.defineProperties(obj, {
                foo: {
                    value: +0
                }
            });
            return false;
        } catch (e) {
            return (e instanceof TypeError) && dataPropertyAttributesAreCorrect(obj, "foo", -0, false, false, false);
        }
    }
runTestCase(testcase);
