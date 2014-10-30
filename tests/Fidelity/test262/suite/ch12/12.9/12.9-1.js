/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch12/12.9/12.9-1.js
 * @description The return Statement - a return statement without an expression may have a LineTerminator before the semi-colon
 */


function testcase() {
        var sum = 0;
        (function innerTest() {
            for (var i = 1; i <= 10; i++) {
                if (i === 6) {
                    return
                    ;
                }
                sum += i;
            }
        })();
        return sum === 15;
    }
runTestCase(testcase);
