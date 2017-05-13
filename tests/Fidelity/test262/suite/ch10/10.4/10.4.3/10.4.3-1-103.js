/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch10/10.4/10.4.3/10.4.3-1-103.js
 * @description Non strict mode should ToObject thisArg if not an object.  Abstract equality operator should succeed.
 */

function testcase(){
  Object.defineProperty(Object.prototype, "x", { get: function () { return this; } }); 
  if((5).x == 0) return false;
  if(!((5).x == 5)) return false;
  return true;
}

runTestCase(testcase);
