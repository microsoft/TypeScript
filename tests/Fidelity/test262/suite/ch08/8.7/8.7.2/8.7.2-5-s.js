/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch08/8.7/8.7.2/8.7.2-5-s.js
 * @description Strict Mode - TypeError is thrown if LeftHandSide is a reference to a non-existent property of an non-extensible object
 * @onlyStrict
 */


function testcase() {
        "use strict";
        var _8_7_2_5 = {};
        Object.preventExtensions(_8_7_2_5);

        try {
            _8_7_2_5.b = 11;
            return false;
        } catch (e) {
            return e instanceof TypeError;
        }
    }
runTestCase(testcase);
