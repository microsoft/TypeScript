/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch10/10.5/10.5-7-b-4-s.js
 * @description Strict Mode - Deleting property of the arguments object successful under strict mode
 * @onlyStrict
 */


function testcase() {
        "use strict";

        function _10_5_7_b_4_fun() {
            var _10_5_7_b_4_1 = arguments[0] === 30 && arguments[1] === 12;
            delete arguments[1];
            var _10_5_7_b_4_2 = arguments[0] === 30 && typeof arguments[1] === "undefined";
            return _10_5_7_b_4_1 && _10_5_7_b_4_2;
        };
        return _10_5_7_b_4_fun(30, 12);
    }
runTestCase(testcase);
