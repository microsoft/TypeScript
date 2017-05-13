/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * Step 4 of defineProperty calls the [[DefineOwnProperty]] internal method
 * of O to define the property. For non-configurable properties, step 11.a.i
 * of [[DefineOwnProperty]] permits setting a setter (if absent).
 *
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-19.js
 * @description Object.defineProperty permits setting a setter (if absent) of non-configurable accessor properties(8.12.9 step 10.a.ii.1)
 */


function testcase() {
  var o = {};

  // create an accessor property; all other attributes default to false.
  // dummy getter
  var getter = function () { return 1;}
  var d1 = { get: getter };
  Object.defineProperty(o, "foo", d1);

  // now, trying to set the setter should succeed even though [[Configurable]]
  // on the original property will be false.
  var desc = { set: undefined };
  Object.defineProperty(o, "foo", desc);

  var d2 = Object.getOwnPropertyDescriptor(o, "foo");

  if (d2.get === getter &&
	  d2.set === undefined &&
	  d2.configurable === false &&
	  d2.enumerable === false) {
	return true;
  }
 }
runTestCase(testcase);
