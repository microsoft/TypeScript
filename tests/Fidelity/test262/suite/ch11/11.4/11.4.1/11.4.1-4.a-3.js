/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * This test is actually testing the [[Delete]] internal method (8.12.8). Since the
 * language provides no way to directly exercise [[Delete]], the tests are placed here.
 *
 * @path ch11/11.4/11.4.1/11.4.1-4.a-3.js
 * @description delete operator returns false when deleting a non-configurable data property
 */


function testcase() {
  var o = {};
  var desc = { value : 1, configurable: false }; // all other attributes default to false
  Object.defineProperty(o, "foo", desc);
  
  // Now, deleting o.foo should fail because [[Configurable]] on foo is false.
  var d = delete o.foo;
  if (d === false && o.hasOwnProperty("foo") === true) {
    return true;
  }
 }
runTestCase(testcase);
