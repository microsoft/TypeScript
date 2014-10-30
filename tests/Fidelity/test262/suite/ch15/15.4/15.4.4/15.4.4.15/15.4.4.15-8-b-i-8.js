/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.15/15.4.4.15-8-b-i-8.js
 * @description Array.prototype.lastIndexOf - element to be retrieved is inherited data property on an Array-like object
 */


function testcase() {

        try {
            Object.prototype[0] = true;
            Object.prototype[1] = false;
            Object.prototype[2] = "true";
            return 0 === Array.prototype.lastIndexOf.call({ length: 3 }, true) &&
                1 === Array.prototype.lastIndexOf.call({ length: 3 }, false) &&
                2 === Array.prototype.lastIndexOf.call({ length: 3 }, "true");
        } finally {
            delete Object.prototype[0];
            delete Object.prototype[1];
            delete Object.prototype[2];
        }
    }
runTestCase(testcase);
