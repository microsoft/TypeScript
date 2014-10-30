/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * PutValue operates only on references (see step 3.b).
 *
 * @path ch11/11.13/11.13.1/11.13.1-4-1.js
 * @description simple assignment creates property on the global object if LeftHandSide is an unresolvable reference
 */


function testcase() {
  function foo() {
    __ES3_1_test_suite_test_11_13_1_unique_id_3__ = 42;
  }
  foo();

  var desc = Object.getOwnPropertyDescriptor(fnGlobalObject(), '__ES3_1_test_suite_test_11_13_1_unique_id_3__');
  if (desc.value === 42 &&
      desc.writable === true &&
      desc.enumerable === true &&
      desc.configurable === true) {
    delete __ES3_1_test_suite_test_11_13_1_unique_id_3__;
    return true;
  }  
 }
runTestCase(testcase);
