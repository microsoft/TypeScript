/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.19/15.4.4.19-8-1.js
 * @description Array.prototype.map doesn't consider new elements added to array after it is called
 */


function testcase() { 
 
  function callbackfn(val, idx, obj)
  {
    srcArr[2] = 3;
    srcArr[5] = 6;
    return 1;
  }

  var srcArr = [1,2,,4,5];
  var resArr = srcArr.map(callbackfn);
  if(resArr.length === 5)
      return true;  
  
 }
runTestCase(testcase);
