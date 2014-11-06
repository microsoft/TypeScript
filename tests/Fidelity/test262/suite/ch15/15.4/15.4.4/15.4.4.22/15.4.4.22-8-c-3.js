/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.22/15.4.4.22-8-c-3.js
 * @description Array.prototype.reduceRight throws TypeError when elements assigned values are deleted and initialValue is not present
 */


function testcase() { 
 
  function callbackfn(prevVal, curVal, idx, obj)
  {
  }

  var arr = [1,2,3,4,5];
  delete arr[0];
  delete arr[1];
  delete arr[2];
  delete arr[3];
  delete arr[4];
  try {
    arr.reduceRight(callbackfn);
  } 
  catch(e) {
    if(e instanceof TypeError)
      return true;  
  }
 }
runTestCase(testcase);
