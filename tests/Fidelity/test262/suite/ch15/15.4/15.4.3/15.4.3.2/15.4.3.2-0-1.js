/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.3/15.4.3.2/15.4.3.2-0-1.js
 * @description Array.isArray must exist as a function
 */


function testcase() {
  var f = Array.isArray;
  if (typeof(f) === "function") {
    return true;
  }
 }
runTestCase(testcase);
