/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.10/15.10.2/15.10.2.15-6-1.js
 * @description Pattern - SyntaxError was thrown when one character in CharSet 'A' greater than one character in CharSet 'B' (15.10.2.15 CharacterRange step 6)
 */


function testcase() {
        try {
            var regExp = new RegExp("^[z-a]$");

            return false;
        } catch (e) {
            return e instanceof SyntaxError;
        }
    }
runTestCase(testcase);
