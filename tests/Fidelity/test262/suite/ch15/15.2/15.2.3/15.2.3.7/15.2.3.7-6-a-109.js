/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.7/15.2.3.7-6-a-109.js
 * @description Object.defineProperties - 'P' is accessor property, several attributes values of P and properties are different (8.12.9 step 12)
 */


function testcase() {

        var obj = {};

        function get_func1() {
            return 10;
        }
        function set_func1() { }

        Object.defineProperty(obj, "foo", {
            get: get_func1,
            set: set_func1,
            configurable: true
        });

        function get_func2() {
            return 20;
        }
        function set_func2(value) {
            obj.setVerifyHelpProp = value;
        }

        Object.defineProperties(obj, {
            foo: {
                get: get_func2,
                set: set_func2,
                configurable: false
            }
        });
        return accessorPropertyAttributesAreCorrect(obj, "foo", get_func2, set_func2, "setVerifyHelpProp", false, false);
    }
runTestCase(testcase);
