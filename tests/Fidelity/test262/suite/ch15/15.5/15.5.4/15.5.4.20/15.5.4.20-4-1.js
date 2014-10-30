/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.5/15.5.4/15.5.4.20/15.5.4.20-4-1.js
 * @description String.prototype.trim handles multiline string with whitepace and lineterminators
 */


function testcase() {
var s = "\u0009a b\
c \u0009"

            
  if (s.trim() === "a bc") {
    return true;
  }
 }
runTestCase(testcase);
