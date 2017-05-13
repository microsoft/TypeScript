/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch11/11.1/11.1.5/11.1.5-1-s.js
 * @description Strict Mode - SyntaxError is thrown when 'eval' occurs as the Identifier in a PropertySetParameterList of a PropertyAssignment that is contained in strict code
 * @onlyStrict
 */


function testcase() {
        "use strict";

        try {
            eval("var obj = {set _11_1_5_1_fun(eval) {}};");
            return false;
        } catch (e) {
            return (e instanceof SyntaxError);
        }
    }
runTestCase(testcase);
