/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch10/10.1/10.1.1/10.1.1-11-s.js
 * @description Strict Mode - Eval code is strict code with a Use Strict Directive at the beginning of the block
 * @noStrict
 */


function testcase() {
        try {
            eval("'use strict'; var public = 1; var anotherVariableNotReserveWord = 2;");

            return false;
        } catch (e) {
            return e instanceof SyntaxError && typeof public === "undefined" &&
                typeof anotherVariableNotReserveWord === "undefined";
        }
    }
runTestCase(testcase);
