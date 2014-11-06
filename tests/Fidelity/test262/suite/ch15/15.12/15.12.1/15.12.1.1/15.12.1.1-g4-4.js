/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.12/15.12.1/15.12.1.1/15.12.1.1-g4-4.js
 * @description The JSON lexical grammar does not allow a JSONStringCharacter to be any of the Unicode characters U+0018 thru U+001F
 */


function testcase() {
  try {
    JSON.parse('"\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f"'); // invalid string characters should produce a syntax error
    }
  catch (e) {
      if (e.name === 'SyntaxError') return true;
      }
  }
runTestCase(testcase);
