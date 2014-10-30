/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.9/15.9.4/15.9.4.4/15.9.4.4-0-3.js
 * @description Date.now must exist as a function
 */


function testcase() {

        var fun = Date.now;
        return (typeof (fun) === "function");
    }
runTestCase(testcase);
