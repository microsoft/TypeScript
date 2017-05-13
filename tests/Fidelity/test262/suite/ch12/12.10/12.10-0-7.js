/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch12/12.10/12.10-0-7.js
 * @description with introduces scope - scope removed when exiting with statement
 */


function testcase() {
  var o = {foo: 1};

  with (o) {
    foo = 42;
  }

  try {
    foo;
  }
  catch (e) {
     return true;
  }
 }
runTestCase(testcase);
