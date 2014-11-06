/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.16/15.4.4.16-7-1.js
 * @description Array.prototype.every considers new elements added to array after the call
 */


function testcase() { 
 
  var calledForThree = false;

  function callbackfn(val, Idx, obj)
  {
    arr[2] = 3;
    if(val == 3)
      calledForThree = true;
    return true;
  }

  var arr = [1,2,,4,5];
  
  var res = arr.every(callbackfn);

  return calledForThree; 
 }
runTestCase(testcase);
