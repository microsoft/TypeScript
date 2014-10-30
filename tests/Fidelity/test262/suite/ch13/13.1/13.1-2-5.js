/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch13/13.1/13.1-2-5.js
 * @description arguments allowed as formal parameter name of a non-strict function declaration
 */


function testcase()
{
  try 
  {
    eval("function foo(arguments){};");
    return true;
  }
  catch (e) {  }
 }
runTestCase(testcase);
