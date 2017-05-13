/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.7/15.7.3/15.7.3-1.js
 * @description Number constructor - [[Prototype]] is the Function prototype object
 */


function testcase() {
  if (Function.prototype.isPrototypeOf(Number) === true) {
    return true;
  }
 }
runTestCase(testcase);
