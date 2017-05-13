/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch13/13.1/13.1-36-s.js
 * @description StrictMode - SyntaxError is thrown if 'eval' occurs as the function name of a FunctionDeclaration whose FunctionBody is in strict mode
 * @onlyStrict
 */


function testcase() {

        try {
            eval("function eval() { 'use strict'; };")
            return false;
        } catch (e) {
            return e instanceof SyntaxError;
        }
    }
runTestCase(testcase);
