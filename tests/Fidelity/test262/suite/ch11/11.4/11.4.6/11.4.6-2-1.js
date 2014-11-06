/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch11/11.4/11.4.6/11.4.6-2-1.js
 * @description +"" should be zero
 */


function testcase() {
  return +"" === 0;
 }
runTestCase(testcase);
