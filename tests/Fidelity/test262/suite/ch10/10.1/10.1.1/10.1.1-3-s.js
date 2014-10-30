/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch10/10.1/10.1.1/10.1.1-3-s.js
 * @description Strict Mode - Use Strict Directive Prologue is '' use strict';' which the first character is space
 * @noStrict
 */


function testcase() {
        " use strict";
        var public = 1;

        return public === 1;
    }
runTestCase(testcase);
