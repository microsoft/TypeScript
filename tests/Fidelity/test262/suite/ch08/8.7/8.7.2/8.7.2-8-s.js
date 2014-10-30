/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch08/8.7/8.7.2/8.7.2-8-s.js
 * @description Strict Mode - TypeError isn't thrown if LeftHandSide is a reference to a property of an extensible object
 * @onlyStrict
 */


function testcase() {
        "use strict";
        var _8_7_2_8 = {};

        _8_7_2_8.b = 11;

        return _8_7_2_8.b === 11;
    }
runTestCase(testcase);
