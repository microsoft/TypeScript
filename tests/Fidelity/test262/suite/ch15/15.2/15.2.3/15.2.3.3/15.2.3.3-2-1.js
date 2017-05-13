/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.3/15.2.3.3-2-1.js
 * @description Object.getOwnPropertyDescriptor returns undefined for undefined property name
 */


function testcase() {
    var o = {};
    var desc = Object.getOwnPropertyDescriptor(o, undefined);
    if (desc === undefined) {
      return true;
    }
 }
runTestCase(testcase);
