/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.18/15.4.4.18-7-3.js
 * @description Array.prototype.forEach doesn't visit deleted elements when Array.length is decreased
 */


function testcase() { 
 
  var callCnt = 0;
  function callbackfn(val, idx, obj)
  {
    arr.length=3;
    callCnt++;
  }

  var arr = [1,2,3,4,5];
  arr.forEach(callbackfn);
  if( callCnt === 3)    
      return true;  
  
 }
runTestCase(testcase);
