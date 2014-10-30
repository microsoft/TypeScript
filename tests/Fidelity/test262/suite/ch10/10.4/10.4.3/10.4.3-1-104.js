/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 *
 * @path ch10/10.4/10.4.3/10.4.3-1-104.js
 * @onlyStrict
 * @description Strict mode should not ToObject thisArg if not an object.  Strict equality operator should succeed.
 */
 
 
function testcase(){
  Object.defineProperty(Object.prototype, "x", { get: function () { "use strict"; return this; } }); 
  if(!((5).x === 5)) return false;
  return true;
}

runTestCase(testcase);
