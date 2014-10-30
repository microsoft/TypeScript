/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * This test should be run without any built-ins being added/augmented.
 * The name JSON must be bound to an object.
 * 
 * Section 15 says that every built-in Function object described in this
 * section � whether as a constructor, an ordinary function, or both � has
 * a length property whose value is an integer. Unless otherwise specified,
 * this value is equal to the largest number of named arguments shown in
 * the section headings for the function description, including optional
 * parameters.
 * 
 * This default applies to JSON.stringify, and it must exist as a function
 * taking 3 parameters.
 *
 * @path ch15/15.12/15.12.3/15.12.3-0-2.js
 * @description JSON.stringify must exist as be a function taking 3 parameters
 */


function testcase() {
  var f = JSON.stringify;

  if (typeof(f) === "function" && f.length === 3) {
    return true;
  }
 }
runTestCase(testcase);
