/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * This test should be run without any built-ins being added/augmented.
 * The name JSON must be bound to an object, and must not support [[Construct]].
 * step 4 in 11.2.2 should throw a TypeError exception.
 *
 * @path ch15/15.12/15.12-0-2.js
 * @description JSON must not support the [[Construct]] method
 */


function testcase() {
  var o = JSON;

  try {
    var j = new JSON();
  }
  catch (e) {
    if (e instanceof TypeError) {
      return true;
    }
  }
 }
runTestCase(testcase);
