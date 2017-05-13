/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.14/15.4.4.14-1-17.js
 * @description Array.prototype.indexOf applied to the global object
 */


function testcase() {
        try {
            var oldLen = fnGlobalObject().length;
            fnGlobalObject()[1] = true;
            fnGlobalObject().length = 2;
            return Array.prototype.indexOf.call(fnGlobalObject(), true) === 1;
        } finally {
            delete fnGlobalObject()[1];
            fnGlobalObject().length = oldLen;
        }
    }
runTestCase(testcase);
