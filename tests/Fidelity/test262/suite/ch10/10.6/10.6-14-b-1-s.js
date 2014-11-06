/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch10/10.6/10.6-14-b-1-s.js
 * @description Strict Mode - [[Enumerable]] attribute value in 'caller' is false under strict mode
 * @onlyStrict
 */


function testcase() {
        "use strict";

        var argObj = function () {
            return arguments;
        } ();

        var verifyEnumerable = false;
        for (var _10_6_14_b_1 in argObj) {
            if (argObj.hasOwnProperty(_10_6_14_b_1) && _10_6_14_b_1 === "caller") {
                verifyEnumerable = true;
            }
        }
        return !verifyEnumerable && argObj.hasOwnProperty("caller");
    }
runTestCase(testcase);
