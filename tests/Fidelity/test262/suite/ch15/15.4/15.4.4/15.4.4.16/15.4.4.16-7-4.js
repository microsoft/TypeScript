/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.16/15.4.4.16-7-4.js
 * @description Array.prototype.every doesn't visit deleted elements when Array.length is decreased
 */


function testcase() { 
 
  function callbackfn(val, Idx, obj)
  {
    arr.length = 3;
    if(val < 4)
       return true;
    else 
       return false;
  }

  var arr = [1,2,3,4,6];
  
  if(arr.every(callbackfn) === true)    
      return true;  
  
 }
runTestCase(testcase);
