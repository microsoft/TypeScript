/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.3/15.3.3/15.3.3.2/15.3.3.2-1.js
 * @description Function.length - data property with value 1
 */


function testcase() {

  var desc = Object.getOwnPropertyDescriptor(Function,"length");
  if(desc.value === 1 &&
     desc.writable === false &&
     desc.enumerable === false &&
     desc.configurable === false)
    return true; 

 }
runTestCase(testcase);
