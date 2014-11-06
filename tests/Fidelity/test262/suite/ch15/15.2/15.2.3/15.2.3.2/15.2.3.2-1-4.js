/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.2/15.2.3.2-1-4.js
 * @description Object.getPrototypeOf throws TypeError if 'O' is a string
 */


function testcase() {
        try {
            Object.getPrototypeOf("abc");
            return false;
        } catch (e) {
            return (e instanceof TypeError);
        }
    }
runTestCase(testcase);
