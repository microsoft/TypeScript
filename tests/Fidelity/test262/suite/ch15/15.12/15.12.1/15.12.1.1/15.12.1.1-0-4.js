/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.12/15.12.1/15.12.1.1/15.12.1.1-0-4.js
 * @description <NBSP> is not valid JSON whitespace as specified by the production JSONWhitespace.
 */


function testcase() {
  
  try {
    JSON.parse('\u00a01234'); // should produce a syntax error 
    }
  catch (e) {
      return true; // treat any exception as a pass, other tests ensure that JSON.parse throws SyntaxError exceptions
      }
  }
runTestCase(testcase);
