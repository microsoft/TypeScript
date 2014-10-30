/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.20/15.4.4.20-9-b-1.js
 * @description Array.prototype.filter - callbackfn not called for indexes never been assigned values
 */


function testcase() { 
 
  var callCnt = 0;
  function callbackfn(val, idx, obj)
  {
    callCnt++;
    return false;
  }

  var srcArr = new Array(10);
  srcArr[1] = undefined; //explicitly assigning a value
  var resArr = srcArr.filter(callbackfn);
  if( resArr.length === 0 && callCnt === 1)
      return true;    
 }
runTestCase(testcase);
