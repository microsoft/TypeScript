/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.4/15.2.3.4-4-b-1.js
 * @description Object.getOwnPropertyNames - descriptor of resultant array is all true
 */


function testcase() {
  var obj = new Object();
  obj.x = 1;
  obj.y = 2;
  var result = Object.getOwnPropertyNames(obj);
  var desc = Object.getOwnPropertyDescriptor(result,"0");
  if (desc.enumerable === true &&
      desc.configurable === true &&
      desc.writable === true) {
    return true;
  }
 }
runTestCase(testcase);
