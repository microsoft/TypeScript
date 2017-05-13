/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch08/8.7/8.7.2/8.7.2-2-s.js
 * @description Strict Mode - ReferenceError isn't thrown if LeftHandSide evaluates to a resolvable Reference
 * @onlyStrict
 */


function testcase() {
        "use strict";
        var b = 11;
        return b === 11;
    }
runTestCase(testcase);
