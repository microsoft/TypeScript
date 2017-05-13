/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch11/11.1/11.1.5/11.1.5_7-2-1-s.js
 * @description Strict Mode - SyntaxError is thrown when an assignment to a reserved word is contained in strict code
 * @onlyStrict
 */


function testcase() {
        "use strict";

        try {
            eval("var data = \"data\";\
            var obj = {\
                set _11_1_5_7_2_1(value) {\
                    public = 42;\
                    data = value;\
                }\
            };\
            obj._11_1_5_7_2_1 = 1;");
            return false;
        } catch (e) {
            return e instanceof SyntaxError;
        }
    }
runTestCase(testcase);
