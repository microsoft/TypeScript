/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.3/15.2.3.3-4-90.js
 * @description Object.getOwnPropertyDescriptor returns data desc for functions on built-ins (Number.prototype.toLocaleString)
 */


function testcase() {
  var desc = Object.getOwnPropertyDescriptor(Number.prototype, "toLocaleString");
  if (desc.value === Number.prototype.toLocaleString &&
      desc.writable === true &&
      desc.enumerable === false &&
      desc.configurable === true) {
    return true;
  }
 }
runTestCase(testcase);
