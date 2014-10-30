/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.19/15.4.4.19-8-2.js
 * @description Array.prototype.map considers new value of elements in array after it is called
 */


function testcase() { 
 
  function callbackfn(val, idx, obj)
  {    
    srcArr[4] = -1;
    if(val > 0)
      return 1;
    else
      return 0;
  }

  var srcArr = [1,2,3,4,5];
  var resArr = srcArr.map(callbackfn);
  if(resArr.length === 5 && resArr[4] === 0)
    return true;  
  
 }
runTestCase(testcase);
