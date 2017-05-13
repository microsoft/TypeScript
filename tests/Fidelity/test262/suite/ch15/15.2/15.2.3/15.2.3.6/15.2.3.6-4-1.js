/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * Step 4 of defineProperty calls the [[DefineOwnProperty]] internal method
 * of O passing 'true' for the Throw flag. In this case, step 3 of
 * [[DefineOwnProperty]] requires that it throw a TypeError exception when
 * current is undefined and extensible is false. The value of desc does not
 * matter.
 *
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-1.js
 * @description Object.defineProperty throws TypeError when adding properties to non-extensible objects(8.12.9 step 3)
 */


function testcase() {
  var o = {};
  Object.preventExtensions(o);

  try {
    var desc = { value: 1 };
    Object.defineProperty(o, "foo", desc);
  }
  catch (e) {
      if (e instanceof TypeError &&
          (o.hasOwnProperty("foo") === false)) {
      return true;
    }
  }
 }
runTestCase(testcase);
