/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.3/15.3.4/15.3.4.5/15.3.4.5-15-2.js
 * @description Function.prototype.bind, 'length' is a data valued own property with default attributes (false)
 */


function testcase() {
  function foo() { }
  var o = {};
  
  var bf = foo.bind(o);
  var desc = Object.getOwnPropertyDescriptor(bf, 'length');
  if (desc.value === 0 &&
      desc.enumerable === false &&
      desc.writable === false &&
      desc.configurable == false) {
    return true;
  }
 }
runTestCase(testcase);
