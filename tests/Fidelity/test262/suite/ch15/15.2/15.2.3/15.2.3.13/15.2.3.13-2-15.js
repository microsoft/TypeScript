/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.13/15.2.3.13-2-15.js
 * @description Object.isExtensible returns true for all built-in objects (Array.prototype)
 */


function testcase() {
  var e = Object.isExtensible(Array.prototype);
  if (e === true) {
    return true;
  }
 }
runTestCase(testcase);
