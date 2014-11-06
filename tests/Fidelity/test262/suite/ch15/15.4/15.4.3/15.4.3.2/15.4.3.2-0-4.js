/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.3/15.4.3.2/15.4.3.2-0-4.js
 * @description Array.isArray return false if its argument is not an Array
 */


function testcase() {
  var b_num   = Array.isArray(42);
  var b_undef = Array.isArray(undefined);
  var b_bool  = Array.isArray(true);
  var b_str   = Array.isArray("abc");
  var b_obj   = Array.isArray({});
  var b_null  = Array.isArray(null);
  
  if (b_num === false &&
      b_undef === false &&
      b_bool === false &&
      b_str === false &&
      b_obj === false &&
      b_null === false) {
    return true;
  }
 }
runTestCase(testcase);
