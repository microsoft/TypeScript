/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.19/15.4.4.19-9-2.js
 * @description Array.prototype.map returns new Array with same number of elements and values the result of callbackfn
 */


function testcase() {

  function callbackfn(val, idx, obj)
  {
    return val + 10;
  }
  var srcArr = [1,2,3,4,5];
  var resArr = srcArr.map(callbackfn);
  if(resArr[0] === 11 &&
     resArr[1] === 12 &&
     resArr[2] === 13 &&
     resArr[3] === 14 &&
     resArr[4] === 15)
  {
    return true;
  }

 }
runTestCase(testcase);
