/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.10/15.10.2/15.10.2.15-3-2.js
 * @description Pattern - SyntaxError was thrown when 'B' does not contain exactly one character (15.10.2.5 step 3)
 */


function testcase() {
        try {
            var regExp = new RegExp("^[a-/w]$");

            return false;
        } catch (e) {
            return e instanceof SyntaxError;
        }
    }
runTestCase(testcase);
