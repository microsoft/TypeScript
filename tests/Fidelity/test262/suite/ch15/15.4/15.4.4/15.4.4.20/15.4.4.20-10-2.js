/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.20/15.4.4.20-10-2.js
 * @description Array.prototype.filter returns new Array with length equal to number of true returned by callbackfn
 */


function testcase() {

  function callbackfn(val, idx, obj)
  {
    if(val % 2)
      return true;
    else
      return false;
  }
  var srcArr = [1,2,3,4,5];
  var resArr = srcArr.filter(callbackfn);
  if(resArr.length === 3 &&
     resArr[0] === 1 &&
     resArr[1] === 3 &&
     resArr[2] === 5)
  {
    return true;
  }

 }
runTestCase(testcase);
