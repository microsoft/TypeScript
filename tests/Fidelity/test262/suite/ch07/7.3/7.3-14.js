/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch07/7.3/7.3-14.js
 * @description 7.3 - ES5 specifies that a multiline comment that contains a line terminator character <LF> (\u000A) must be treated as a single line terminator for the purposes of semicolon insertion
 */


function testcase() {
        /*MultiLine
        Comments 
        \u000A var = ;
        */
        return true;
    }
runTestCase(testcase);
