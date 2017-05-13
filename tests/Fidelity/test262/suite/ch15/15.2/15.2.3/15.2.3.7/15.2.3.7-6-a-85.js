/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.7/15.2.3.7-6-a-85.js
 * @description Object.defineProperties throws TypeError when P.configurable is false, P.writalbe is false, properties.value and P.value are two objects with different values (8.12.9 step 10.a.ii.1)
 */


function testcase() {

        var obj = {};

        var obj1 = { length: 10 };

        Object.defineProperty(obj, "foo", { 
            value: obj1, 
            writable: false, 
            configurable: false 
        });

        var obj2 = { length: 20 };

        try {
            Object.defineProperties(obj, {
                foo: {
                    value: obj2
                }
            });
            return false;
        } catch (e) {
            return (e instanceof TypeError) && dataPropertyAttributesAreCorrect(obj, "foo", obj1, false, false, false);
        }
    }
runTestCase(testcase);
