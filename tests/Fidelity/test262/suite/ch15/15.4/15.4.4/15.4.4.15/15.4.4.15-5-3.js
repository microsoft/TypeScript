/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.15/15.4.4.15-5-3.js
 * @description Array.prototype.lastIndexOf when fromIndex is boolean
 */


function testcase() {
  var a = new Array(1,2,1);
  if (a.lastIndexOf(2,true) === 1 &&        // true resolves to 1
     a.lastIndexOf(2,false) === -1 ) {      // false resolves to 0
    return true;
  }
 }
runTestCase(testcase);
