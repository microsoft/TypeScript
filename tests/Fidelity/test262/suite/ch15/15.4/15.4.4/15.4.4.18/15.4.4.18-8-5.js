/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.18/15.4.4.18-8-5.js
 * @description Array.prototype.forEach doesn't call callbackfn if 'length' is 0 (subclassed Array, length overridden to '0' (type conversion))
 */


function testcase() {
  foo.prototype = new Array(1, 2, 3);
  function foo() {}
  var f = new foo();
  f.length = '0';
  
  var callCnt = 0;
  function cb(){callCnt++}
  var i = f.forEach(cb);  
  if (callCnt === 0) {
    return true;
  }
 }
runTestCase(testcase);
