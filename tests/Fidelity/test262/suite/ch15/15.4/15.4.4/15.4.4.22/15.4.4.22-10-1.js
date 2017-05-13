/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.22/15.4.4.22-10-1.js
 * @description Array.prototype.reduceRight doesn't mutate the Array on which it is called on
 */


function testcase() {

  function callbackfn(prevVal, curVal,  idx, obj)
  {
    return 1;
  }
  var srcArr = [1,2,3,4,5];
  srcArr.reduceRight(callbackfn);
  if(srcArr[0] === 1 &&
     srcArr[1] === 2 &&
     srcArr[2] === 3 &&
     srcArr[3] === 4 &&
     srcArr[4] === 5)
  {
    return true;
  }

 }
runTestCase(testcase);
