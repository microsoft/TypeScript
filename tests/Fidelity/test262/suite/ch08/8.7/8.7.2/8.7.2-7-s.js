/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch08/8.7/8.7.2/8.7.2-7-s.js
 * @description Strict Mode - TypeError isn't thrown if LeftHandSide is a reference to an accessor property with setter
 * @onlyStrict
 */


function testcase() {
        "use strict";
        var _8_7_2_7 = {};
        var _8_7_2_7_bValue = 1;
        Object.defineProperty(_8_7_2_7, "b", {
            get: function () { return _8_7_2_7_bValue; },
            set: function (value) { _8_7_2_7_bValue = value; }
        });

        _8_7_2_7.b = 11;
        return _8_7_2_7.b === 11;
    }
runTestCase(testcase);
