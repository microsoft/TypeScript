/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.3/15.3.4/15.3.4.4/15.3.4.4-2-s.js
 * @description Strict Mode - 'this' value is a number which cannot be converted to wrapper objects  when the function is called without an array argument
 * @onlyStrict
 */


function testcase() {
        "use strict";
        function fun() {
            return (this instanceof Number);
        }
        return !fun.call(-12);
    }
runTestCase(testcase);
