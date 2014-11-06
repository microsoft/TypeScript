/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.22/15.4.4.22-9-c-ii-1.js
 * @description Array.prototype.reduceRight - callbackfn called with correct parameters (initialvalue not passed)
 */


function testcase() { 
 
  function callbackfn(prevVal, curVal, idx, obj)
  {
    if(idx+1 < obj.length && obj[idx] === curVal && obj[idx+1] === prevVal)
      return curVal;
    else 
      return false;
  }

  var arr = [0,1,true,null,new Object(),"five"];
  if( arr.reduceRight(callbackfn) === 0) 
    return true;
 }
runTestCase(testcase);
