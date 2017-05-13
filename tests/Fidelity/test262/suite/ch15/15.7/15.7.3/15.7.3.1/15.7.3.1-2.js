/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.7/15.7.3/15.7.3.1/15.7.3.1-2.js
 * @description Number.prototype, initial value is the Number prototype object
 */


function testcase() {
  // assume that Number.prototype has not been modified.
  return Object.getPrototypeOf(new Number(42))===Number.prototype;
 }
runTestCase(testcase);
