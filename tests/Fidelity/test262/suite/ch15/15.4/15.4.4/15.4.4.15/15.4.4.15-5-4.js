/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.15/15.4.4.15-5-4.js
 * @description Array.prototype.lastIndexOf when fromIndex is undefined
 */


function testcase() {
  var a = new Array(1,2,1);
  if (a.lastIndexOf(2,undefined) === -1 &&
      a.lastIndexOf(1,undefined) === 0  &&
      a.lastIndexOf(1) === 2)   {    // undefined resolves to 0, no second argument resolves to len
    return true;
  }
 }
runTestCase(testcase);
