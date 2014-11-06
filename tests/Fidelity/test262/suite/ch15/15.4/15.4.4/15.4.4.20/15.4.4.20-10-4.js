/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.20/15.4.4.20-10-4.js
 * @description Array.prototype.filter doesn't visit expandos
 */


function testcase() {

  var callCnt = 0;
  function callbackfn(val, idx, obj)
  {
    callCnt++;
  }
  var srcArr = [1,2,3,4,5];
  srcArr["i"] = 10;
  srcArr[true] = 11;

  var resArr = srcArr.filter(callbackfn);
  if(callCnt == 5)
  {
    return true;
  }

 }
runTestCase(testcase);
