/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * Step 4 of defineProperty calls the [[DefineOwnProperty]] internal method
 * of O to define the property. For non-configurable properties, step 10.a.i
 * of [[DefineOwnProperty]] rejects if relaxing the [[Writable]] attribute.
 *
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-16.js
 * @description Object.defineProperty throws TypeError when relaxing [[Writable]] on non-configurable data properties
 */


function testcase() {
  var o = {};

  // create a data valued property; all other attributes default to false.
  var d1 = { value: 101 };
  Object.defineProperty(o, "foo", d1);

  // now, relaxing [[Writable]] on "foo" should fail, since both
  // [[Configurable]] and [[Writable]] on the original property will be false.
  var desc = { value: 101, writable: true };

  try {
    Object.defineProperty(o, "foo", desc);
  }
  catch (e) {
    if (e instanceof TypeError) {
      // the property should remain unchanged.
      var d2 = Object.getOwnPropertyDescriptor(o, "foo");
      if (d2.value === 101 &&
          d2.writable === false &&
          d2.enumerable === false &&
          d2.configurable === false) {
        return true;
      }
    }
  }
 }
runTestCase(testcase);
