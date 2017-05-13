/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.1/15.1.2/15.1.2.2/15.1.2.2-2-1.js
 * @description pareseInt - 'S' is the empty string when inputString does not contain any such characters
 */


function testcase() {
        return isNaN(parseInt("")) && parseInt("") !== parseInt("");
    }
runTestCase(testcase);
