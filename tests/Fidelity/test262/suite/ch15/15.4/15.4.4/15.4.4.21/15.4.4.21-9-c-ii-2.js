/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.21/15.4.4.21-9-c-ii-2.js
 * @description Array.prototype.reduce - callbackfn called with correct parameters (initialvalue passed)
 */


function testcase() { 
 
  var bParCorrect = false;
  function callbackfn(prevVal, curVal, idx, obj)
  {
    if(idx === 0 && obj[idx] === curVal && prevVal === initialValue)
      return curVal;
    else if(idx > 0 && obj[idx] === curVal && obj[idx-1] === prevVal)
      return curVal;
    else
      return false;
  }

  var arr = [0,1,true,null,new Object(),"five"];
  var initialValue = 5.5;
  if( arr.reduce(callbackfn,initialValue) === "five") 
    return true;
 }
runTestCase(testcase);
