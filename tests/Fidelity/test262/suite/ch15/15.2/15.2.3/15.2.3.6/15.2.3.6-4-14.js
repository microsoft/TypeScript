/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * Step 4 of defineProperty calls the [[DefineOwnProperty]] internal method
 * of O to define the property. For configurable properties, step 9b of
 * [[DefineOwnProperty]] permits changing the kind of a property.
 *
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-14.js
 * @description Object.defineProperty permits changing data property to accessor property for configurable properties
 */


function testcase() {
  var o = {};

  // create a data property. In this case,
  // [[Enumerable]] and [[Configurable]] are true
  o["foo"] = 101;

  // changing "foo" to be an accessor should succeed, since [[Configurable]]
  // on the original property will be true. Existing values of [[Configurable]]
  // and [[Enumerable]] need to be preserved and the rest need to be set to
  // their default values

  // dummy getter
  var getter = function () { return 1; }
  var d1 = { get: getter };
  Object.defineProperty(o, "foo", d1);

  var d2 = Object.getOwnPropertyDescriptor(o, "foo");

  if (d2.get === getter &&
      d2.enumerable === true &&
      d2.configurable === true) {
    return true;
  }
 }
runTestCase(testcase);
