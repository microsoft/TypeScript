/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch12/12.2/12.2.1/12.2.1-14-s.js
 * @description arguments - a function expr declaring a var named 'arguments' throws SyntaxError in strict mode
 * @onlyStrict
 */




function testcase() {
  'use strict';

  try {
    eval('(function (){var arguments;});');
    return false;
  }
  catch (e) {
    return (e instanceof SyntaxError);
  }
}
runTestCase(testcase);