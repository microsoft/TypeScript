/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.10/15.10.4/15.10.4.1/15.10.4.1-2.js
 * @description RegExp - the thrown error is SyntaxError instead of RegExpError when the characters of 'P' do not have the syntactic form Pattern
 */


function testcase() {
        try {
            var regExpObj = new RegExp('\\');

            return false;
        } catch (e) {
            return e instanceof SyntaxError;
        }
    }
runTestCase(testcase);
