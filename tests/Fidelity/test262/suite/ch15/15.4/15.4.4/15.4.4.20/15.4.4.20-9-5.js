/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.20/15.4.4.20-9-5.js
 * @description Array.prototype.filter doesn't consider newly added elements in sparse array
 */


function testcase() { 
 
  function callbackfn(val, idx, obj)
  {
    srcArr[1000] = 3;
    return true;
  }

  var srcArr = new Array(10);
  srcArr[1] = 1;
  srcArr[2] = 2;
  var resArr = srcArr.filter(callbackfn);
  if( resArr.length === 2)    
      return true;  
  
 }
runTestCase(testcase);
