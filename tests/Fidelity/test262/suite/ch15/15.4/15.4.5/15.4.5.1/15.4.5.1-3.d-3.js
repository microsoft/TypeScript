/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.5/15.4.5.1/15.4.5.1-3.d-3.js
 * @description Set array length property to max value 4294967295 (2**32-1,)
 */


function testcase() {  
  var a =[];
  a.length = 4294967295 ;
  return a.length===4294967295 ;
 }
runTestCase(testcase);
