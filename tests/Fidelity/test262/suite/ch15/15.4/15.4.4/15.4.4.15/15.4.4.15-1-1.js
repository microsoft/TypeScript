/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.15/15.4.4.15-1-1.js
 * @description Array.prototype.lastIndexOf applied to undefined throws a TypeError
 */


function testcase() {

        try {
            Array.prototype.lastIndexOf.call(undefined);
            return false;
        } catch (e) {
            if (e instanceof TypeError) {
                return true;
            }
        }
    }
runTestCase(testcase);
