/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * Step 4 of defineProperty calls the [[DefineOwnProperty]] internal method
 * of O to define the property. Step 7b of [[DefineOwnProperty]] rejects if
 * current.[[Enumerable]] and desc.[[Enumerable]] are the boolean negations
 * of each other.
 *
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-8.js
 * @description Object.defineProperty throws TypeError when changing [[Enumerable]] from false to true on non-configurable data properties
 */


function testcase() {
  var o = {};

  // create a data valued property; all other attributes default to false.
  var d1 = { value: 101, enumerable: false, configurable: false };
  Object.defineProperty(o, "foo", d1);

  // now, setting enumerable to true should fail, since [[Configurable]]
  // on the original property will be false.
  var desc = { value: 101, enumerable: true };

  try {
    Object.defineProperty(o, "foo", desc);
  }
  catch (e) {
    if (e instanceof TypeError) {
      // the property should remain unchanged.
      var d2 = Object.getOwnPropertyDescriptor(o, "foo");
      if (d2.value === 101 &&
          d2.enumerable === false &&
          d2.configurable === false) {
        return true;
      }
    }
  }
 }
runTestCase(testcase);
