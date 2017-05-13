/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.20/15.4.4.20-9-c-ii-2.js
 * @description Array.prototype.filter - callbackfn takes 3 arguments
 */


function testcase() { 
 
  var parCnt = 3;
  var bCalled = false
  function callbackfn(val, idx, obj)
  { 
    bCalled = true;
    if(arguments.length !== 3)
      parCnt = arguments.length;   //verify if callbackfn was called with 3 parameters
  }

  var srcArr = [0,1,2,3,4,5,6,7,8,9];
  var resArr = srcArr.filter(callbackfn);
  if(bCalled === true && parCnt === 3)
    return true;
 }
runTestCase(testcase);
