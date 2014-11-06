/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.12/15.12.1/15.12.1.1/15.12.1.1-g4-2.js
 * @description The JSON lexical grammar does not allow a JSONStringCharacter to be any of the Unicode characters U+0008 thru U+000F
 */


function testcase() {
  try {
    JSON.parse('"\u0008\u0009\u000a\u000b\u000c\u000d\u000e\u000f"'); // invalid string characters should produce a syntax error
    }
  catch (e) {
      return true; // treat any exception as a pass, other tests ensure that JSON.parse throws SyntaxError exceptions
      }
  }
runTestCase(testcase);
