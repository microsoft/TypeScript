/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.7/15.2.3.7-3-8.js
 * @description Object.defineProperties - no additional property is defined in 'O' when 'Properties' doesn't contain enumerable own property 
 */


function testcase() {

        var obj = {};

        var props = {};

        Object.defineProperty(props, "prop1", {
            value: {},
            enumerable: false
        });

        Object.defineProperty(props, "prop2", {
            get: function () {
                return {};
            },
            enumerable: true
        });

        Object.defineProperties(obj, props);

        return !obj.hasOwnProperty("prop1") && obj.hasOwnProperty("prop2");
    }
runTestCase(testcase);
