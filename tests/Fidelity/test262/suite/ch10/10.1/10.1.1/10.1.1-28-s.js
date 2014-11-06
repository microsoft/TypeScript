/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch10/10.1/10.1.1/10.1.1-28-s.js
 * @description Strict Mode - Function code of Accessor PropertyAssignment contains Use Strict Directive which appears at the end of the block(setter)
 * @noStrict
 */


function testcase() {
        var obj = {};
        var data;

        Object.defineProperty(obj, "accProperty", {
            set: function (value) {
                var _10_1_1_28_s = {a:1, a:2};
                data = value;
                "use strict";
            }
        });
        obj.accProperty = "overrideData";
        return data==="overrideData";
    }
runTestCase(testcase);
