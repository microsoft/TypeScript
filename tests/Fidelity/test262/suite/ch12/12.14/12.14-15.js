/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch12/12.14/12.14-15.js
 * @description Exception object is a function which is a property of an object, when an exception parameter is called as a function in catch block, global object is passed as the this value
 */


function testcase() {
        var obj = {};
        obj.test = function () {
            this._12_14_15_foo = "test";
        };
        try {
            throw obj.test;
            return false;
        } catch (e) {
            e();
            return  fnGlobalObject()._12_14_15_foo === "test";
        }
        finally {
            delete fnGlobalObject()._12_14_15_foo;
        }
    }
runTestCase(testcase);
