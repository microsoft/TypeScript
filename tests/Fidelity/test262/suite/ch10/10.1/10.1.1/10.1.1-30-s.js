/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch10/10.1/10.1.1/10.1.1-30-s.js
 * @description Strict Mode - Function code of built-in Function constructor contains Use Strict Directive which appears at the start of the block
 * @noStrict
 */


function testcase() {
        try {
            var funObj = new Function("a", "'use strict'; eval('public = 1;');");
            funObj();
            return false;
        } catch (e) {
            return e instanceof SyntaxError;
        }
    }
runTestCase(testcase);
