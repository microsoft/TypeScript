/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch12/12.10/12.10-2-1.js
 * @description with - expression being Number
 */


function testcase() {
  var o = 2;
  var foo = 1;
  try
  {
    with (o) {
      foo = 42;
    }
  }
  catch(e)
  {
  }
  return true;
  
 }
runTestCase(testcase);
