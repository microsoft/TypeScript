/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.3/15.4.3.2/15.4.3.2-0-3.js
 * @description Array.isArray return true if its argument is an Array
 */


function testcase() {
  var a = [];
  var b = Array.isArray(a);
  if (b === true) {
    return true;
  }
 }
runTestCase(testcase);
