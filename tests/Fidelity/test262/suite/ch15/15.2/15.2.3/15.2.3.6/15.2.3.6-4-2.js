/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * Step 4 of defineProperty calls the [[DefineOwnProperty]] internal method
 * of O to define the property. For newly defined data properties, attributes
 * missing from desc should have values set to the defaults from 8.6.1.
 *
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-2.js
 * @description Object.defineProperty sets missing attributes to their default values (data properties)(8.12.9 step 4.a.i)
 */


function testcase() {
  var o = {};

  var desc = { value: 1 };
  Object.defineProperty(o, "foo", desc);
  
  var propDesc = Object.getOwnPropertyDescriptor(o, "foo");
  
  if (propDesc.value        === 1 &&          // this is the value that was set
      propDesc.writable     === false &&      // false by default
      propDesc.enumerable   === false &&      // false by default
      propDesc.configurable === false) {      // false by default
    return true;
  }
 }
runTestCase(testcase);
