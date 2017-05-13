/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.16/15.4.4.16-7-2.js
 * @description Array.prototype.every considers new value of elements in array after the call
 */


function testcase() { 
 
  function callbackfn(val, Idx, obj)
  {
    arr[4] = 6;
    if(val < 6)
       return true;
    else 
       return false;
  }

  var arr = [1,2,3,4,5];
  
  if(arr.every(callbackfn) === false)    
      return true;  
  
 }
runTestCase(testcase);
