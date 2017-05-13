/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.14/15.4.4.14-2-2.js
 * @description Array.prototype.indexOf - 'length' is own data property on an Array
 */


function testcase() {
        var targetObj = {};
        try {
            Array.prototype[2] = targetObj;
            
            return [0, targetObj].indexOf(targetObj) === 1 &&
                [0, 1].indexOf(targetObj) === -1;

        } finally {
            delete Array.prototype[2];
        }
    }
runTestCase(testcase);
