/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch12/12.10/12.10-7-1.js
 * @description with introduces scope - restores the earlier environment on exit
 */


function testcase() {
  var a = 1;

  var o = {a : 2};
  try
  {
    with (o) {
      a = 3;
      throw 1;
      a = 4;
    }
  }
  catch(e)
  {}

  if (a === 1 && o.a === 3) {
      return true;
  }

 }
runTestCase(testcase);
