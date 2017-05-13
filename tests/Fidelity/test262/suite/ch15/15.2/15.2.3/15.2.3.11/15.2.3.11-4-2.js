/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.11/15.2.3.11-4-2.js
 * @description Object.isSealed returns false for all built-in objects (Object)
 */


function testcase() {
  var b = Object.isSealed(Object);
  if (b === false) {
    return true;
  }
 }
runTestCase(testcase);
