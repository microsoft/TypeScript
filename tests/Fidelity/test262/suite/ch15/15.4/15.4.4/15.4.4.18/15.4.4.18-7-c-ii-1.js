/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.18/15.4.4.18-7-c-ii-1.js
 * @description Array.prototype.forEach - callbackfn called with correct parameters
 */


function testcase() { 
 
  var bPar = true;
  var bCalled = false;
  function callbackfn(val, idx, obj)
  {
    bCalled = true;
    if(obj[idx] !== val)
      bPar = false;
  }

  var arr = [0,1,true,null,new Object(),"five"];
  arr[999999] = -6.6;
  arr.forEach(callbackfn);
  if(bCalled === true && bPar === true)
    return true;
 }
runTestCase(testcase);
