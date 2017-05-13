/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * Refer 13; 
 * The production FunctionBody : SourceElementsopt is evaluated as follows:
 *
 * @path ch13/13.0/13.0-8-s.js
 * @description Strict Mode - SourceElements is evaluated as strict mode code when the code of this FunctionExpression is contained in non-strict mode but the call to eval is a direct call in strict mode code
 * @onlyStrict
 */


function testcase() {
        "use strict";

        try {
            eval("var _13_0_8_fun = function () {eval = 42;};");
            _13_0_8_fun();
            return false;
        } catch (e) {
            return e instanceof SyntaxError;
        }
    }
runTestCase(testcase);
