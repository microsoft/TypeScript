/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.19/15.4.4.19-4-6.js
 * @description Array.prototype.map throws TypeError if callbackfn is string
 */


function testcase() {

  var arr = new Array(10);
  try {
    arr.map("abc");    
  }
  catch(e) {
    if(e instanceof TypeError)
      return true;  
  }

 }
runTestCase(testcase);
