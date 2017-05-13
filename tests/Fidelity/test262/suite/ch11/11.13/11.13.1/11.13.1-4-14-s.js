/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch11/11.13/11.13.1/11.13.1-4-14-s.js
 * @description simple assignment throws TypeError if LeftHandSide is a readonly property in strict mode (Number.MAX_VALUE)
 * @onlyStrict
 */


function testcase() {
  'use strict';

  try {
    Number.MAX_VALUE = 42;
    return false;
  }
  catch (e) {
    return (e instanceof TypeError);
  }
 }
runTestCase(testcase);
