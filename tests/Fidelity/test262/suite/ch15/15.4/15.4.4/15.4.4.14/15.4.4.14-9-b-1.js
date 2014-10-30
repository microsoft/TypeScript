/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.14/15.4.4.14-9-b-1.js
 * @description Array.prototype.indexOf - non-existent property wouldn't be called
 */


function testcase() {

        return [0, , 2].indexOf(undefined) === -1;
    }
runTestCase(testcase);
