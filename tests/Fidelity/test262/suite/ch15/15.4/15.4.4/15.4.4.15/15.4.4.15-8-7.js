/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.15/15.4.4.15-8-7.js
 * @description Array.prototype.lastIndexOf must return correct index (self reference)
 */


function testcase() {
  var a = new Array(0,1,2,3);  
  a[2] = a;
  if (a.lastIndexOf(a) === 2 &&  
      a.lastIndexOf(3) === 3 ) 
  {
    return true;
  }
 }
runTestCase(testcase);
