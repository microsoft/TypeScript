/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.14/15.4.4.14-7-4.js
 * @description Array.prototype.indexOf returns -1 when 'fromIndex' is 1
 */


function testcase() {

        return [1, 2, 3].indexOf(1, 1) === -1;
    }
runTestCase(testcase);
