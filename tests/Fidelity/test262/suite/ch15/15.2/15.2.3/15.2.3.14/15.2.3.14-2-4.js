/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.14/15.2.3.14-2-4.js
 * @description Object.keys returns the standard built-in Array that is extensible
 */


function testcase() {
  var o = { x: 1, y: 2};

  var a = Object.keys(o);
  if (Object.isExtensible(a) === true) {
    return true;
  }
 }
runTestCase(testcase);
