/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * Step 4 of defineProperty calls the [[DefineOwnProperty]] internal method
 * of O to define the property. Step 6 of [[DefineOwnProperty]] returns if
 * every field of desc also occurs in current and every field in desc has
 * the same value as current.
 *
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-5.js
 * @description Object.defineProperty is no-op if current and desc are the same data desc
 */


function testcase() {
  function sameDataDescriptorValues(d1, d2) {
    return (d1.value === d2.value &&
            d1.enumerable === d2.enumerable &&
            d1.writable === d2.writable &&
            d1.configurable === d2.configurable);
  }

  var o = {};

  // create a data valued property with the following attributes:
  // value: 101, enumerable: true, writable: true, configurable: true
  o["foo"] = 101;

  // query for, and save, the desc. A subsequent call to defineProperty
  // with the same desc should not disturb the property definition.
  var d1 = Object.getOwnPropertyDescriptor(o, "foo");  

  // now, redefine the property with the same descriptor
  // the property defintion should not get disturbed.
  var desc = { value: 101, enumerable: true, writable: true, configurable: true };
  Object.defineProperty(o, "foo", desc);

  var d2 = Object.getOwnPropertyDescriptor(o, "foo"); 

  if (sameDataDescriptorValues(d1, d2) === true) {
    return true;
  }
 }
runTestCase(testcase);
