/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.15/15.4.4.15-8-b-i-7.js
 * @description Array.prototype.lastIndexOf - element to be retrieved is inherited data property on an Array
 */


function testcase() {

        try {
            Array.prototype[0] = true;
            Array.prototype[1] = false;
            Array.prototype[2] = "true";
            return 0 === [, , , ].lastIndexOf(true) &&
                1 === [, , , ].lastIndexOf(false) &&
                2 === [, , , ].lastIndexOf("true");
        } finally {
            delete Array.prototype[0];
            delete Array.prototype[1];
            delete Array.prototype[2];
        }
    }
runTestCase(testcase);
