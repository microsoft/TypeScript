/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.5/15.5.4/15.5.4.20/15.5.4.20-1-2.js
 * @description String.prototype.trim throws TypeError when string is null
 */


function testcase() {
  try
  {
    String.prototype.trim.call(null);  
    return false;
  }
  catch(e)
  {
    return e instanceof TypeError;
  }
 }
runTestCase(testcase);
