/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.5/15.5.4/15.5.4.20/15.5.4.20-1-5.js
 * @description String.prototype.trim works for an Object
 */


function testcase() {
  try
  {
    if(String.prototype.trim.call({})=="[object Object]")
      return true;
  }
  catch(e)
  {
  }
 }
runTestCase(testcase);
