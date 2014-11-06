/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.14/15.4.4.14-9-b-i-3.js
 * @description Array.prototype.indexOf - element to be retrieved is own data property that overrides an inherited data property on an Array
 */


function testcase() {
        try {
            Array.prototype[0] = false;
            return [true].indexOf(true) === 0;
        } finally {
            delete Array.prototype[0];
        }
    }
runTestCase(testcase);
