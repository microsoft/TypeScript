/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch10/10.5/10.5-7-b-1-s.js
 * @description Strict Mode - arguments object is immutable in eval'ed functions
 * @onlyStrict
 */


function testcase() {
        "use strict";

        try {
            eval("(function _10_5_7_b_1_fun() { arguments = 10;} ());");
            return false;
        } catch (e) {
            return e instanceof SyntaxError;
        }
    }
runTestCase(testcase);
