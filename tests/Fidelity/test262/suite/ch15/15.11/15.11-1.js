/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.11/15.11-1.js
 * @description Error - ConversionError has been removed from IE9 standard mode
 */


function testcase() {
        return typeof ConversionError === "undefined";
    }
runTestCase(testcase);
