/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch11/11.4/11.4.1/11.4.1-3-3.js
 * @description delete operator returns true when deleting an explicitly qualified yet unresolvable reference (property undefined for base obj)
 */


function testcase() {
  var __ES3_1_test_suite_test_11_4_1_3_unique_id_3__ = {};
  var d = delete __ES3_1_test_suite_test_11_4_1_3_unique_id_3__.x;
  if (d === true) {
    return true;
  }
 }
runTestCase(testcase);
