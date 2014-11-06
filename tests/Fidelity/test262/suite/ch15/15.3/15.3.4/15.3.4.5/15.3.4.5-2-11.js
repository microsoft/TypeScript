/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.

/**
 * @path ch15/15.3/15.3.4/15.3.4.5/15.3.4.5-2-11.js
 * @description Function.prototype.bind throws TypeError if 'Target' is NULL
 */
function testcase() {
        try {
            Function.prototype.bind.call(null);
            return false;
        } catch (e) {
            return (e instanceof TypeError);
        }
    }
runTestCase(testcase);
