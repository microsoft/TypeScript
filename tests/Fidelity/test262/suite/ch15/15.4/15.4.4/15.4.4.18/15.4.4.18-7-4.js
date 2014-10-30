/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.18/15.4.4.18-7-4.js
 * @description Array.prototype.forEach doesn't consider newly added elements in sparse array
 */


function testcase() { 
 
  var callCnt = 0;
  function callbackfn(val, idx, obj)
  {
    arr[1000] = 3;
    callCnt++;
  }

  var arr = new Array(10);
  arr[1] = 1;
  arr[2] = 2;
  arr.forEach(callbackfn);
  if( callCnt === 2)    
      return true;  
  
 }
runTestCase(testcase);
