/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.12/15.12.3/15.12.3_4-1-1.js
 * @description JSON.stringify a circular object throws a error
 */


function testcase() {
  var obj = {};
  obj.prop = obj;
  try {
     JSON.stringify(obj);
     return false;  // should not reach here
     }
   catch (e) {return true}
  }
runTestCase(testcase);
