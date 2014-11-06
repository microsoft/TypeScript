/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch12/12.10/12.10.1/12.10.1-14-s.js
 * @description Strict Mode - SyntaxError is thrown when the getter of a literal object utilizes WithStatement
 * @onlyStrict
 */


function testcase() {
        "use strict";

        try {
            eval("var obj = { get: function (a) { with(a){} } }; ");

            return false;
        } catch (e) {
            return e instanceof SyntaxError;
        }
    }
runTestCase(testcase);
