/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.16/15.4.4.16-8-2.js
 * @description Array.prototype.every returns true if 'length' is 0 (subclassed Array, length overridden to null (type conversion))
 */


function testcase() {
  foo.prototype = new Array(1, 2, 3);
  function foo() {}
  var f = new foo();
  f.length = null;
  
  function cb(){}
  var i = f.every(cb);
  
  if (i === true) {
    return true;
  }
 }
runTestCase(testcase);
