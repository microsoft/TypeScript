/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch10/10.4/10.4.2/10.4.2-1-1.js
 * @description Indirect call to eval has context set to global context
 */

var __10_4_2_1_1_1 = "str";
function testcase() {
  try {

    var _eval = eval;
    var __10_4_2_1_1_1 = "str1";
    if(_eval("\'str\' === __10_4_2_1_1_1") === true &&  // indirect eval
       eval("\'str1\' === __10_4_2_1_1_1") === true) {   // direct eval
       return true;
    }
    return false;
  } finally {
    delete this.__10_4_2_1_1_1;
  }
}
runTestCase(testcase);
