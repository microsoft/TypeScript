/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.15/15.4.4.15-9-1.js
 * @description Array.prototype.lastIndexOf returns -1 for elements not present
 */


function testcase() {
  var a = new Array();
  a[100] = 1;
  a[99999] = "";  
  a[10] = new Object();
  a[5555] = 5.5;
  a[123456] = "str";
  a[5] = 1E+309;
  if (a.lastIndexOf(1) !== 100 ||
      a.lastIndexOf("") !== 99999 ||
      a.lastIndexOf("str") !== 123456 ||
      a.lastIndexOf(5.5) !== 5555 ||
      a.lastIndexOf(1E+309) !== 5 )      
  {
    return false;
  }    
  if (a.lastIndexOf(true) === -1 && 
      a.lastIndexOf(5) === -1 &&
      a.lastIndexOf("str1") === -1 &&
      a.lastIndexOf(null) === -1  &&
      a.lastIndexOf(new Object()) === -1 ) 
  {
    return true;
  }
 }
runTestCase(testcase);
