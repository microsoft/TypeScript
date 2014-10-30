/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.5/15.5.4/15.5.4.20/15.5.4.20-4-6.js
 * @description String.prototype.trim handles whitepace and lineterminators (\u0020abc)
 */


function testcase() {
  if ("\u0020abc".trim() === "abc") {
    return true;
  }
 }
runTestCase(testcase);
