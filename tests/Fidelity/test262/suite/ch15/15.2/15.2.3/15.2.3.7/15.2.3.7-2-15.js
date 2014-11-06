/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.7/15.2.3.7-2-15.js
 * @description Object.defineProperties - argument 'Properties' is an Error object
 */


function testcase() {

        var obj = {};
        var props = new Error("test");
        var obj1 = {
            value: 11
        };
        props.description = obj1;
        props.message = obj1;
        props.name = obj1;

        var result = false;
       
        Object.defineProperty(props, "prop", {
            get: function () {
                result = this instanceof Error;
                return {};
            },
            enumerable: true
        });

        Object.defineProperties(obj, props);
        return result;
    }
runTestCase(testcase);
