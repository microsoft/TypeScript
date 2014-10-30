/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.7/15.2.3.7-6-a-87.js
 * @description Object.defineProperties throws TypeError when P.configurable is false, both properties.[[Set]] and P.[[Set]] are two objects which refer to different objects (8.12.9 step 11.a.i)
 */


function testcase() {

        var obj = {};

        function set_func1(value) {
            obj.setVerifyHelpProp = value;
        }

        Object.defineProperty(obj, "foo", {
            set: set_func1,
            configurable: false
        });

        function set_func2() {}

        try {
            Object.defineProperties(obj, {
                foo: {
                    set: set_func2
                }
            });
            return false;
        } catch (e) {
            return (e instanceof TypeError) && accessorPropertyAttributesAreCorrect(obj, "foo", undefined, set_func1, "setVerifyHelpProp", false, false);
        }

    }
runTestCase(testcase);
