/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.12/15.12.3/15.12.3-6-b-4.js
 * @description JSON.stringify treats numeric space arguments (in the range 1..10) is equivalent to a string of spaces of that length.
 */


function testcase() {
  var obj = {a1: {b1: [1,2,3,4], b2: {c1: 1, c2: 2}},a2: 'a2'};
  var fiveSpaces = '     ';
  //               '12345'
  return JSON.stringify(obj,null, 5)=== JSON.stringify(obj, null, fiveSpaces);  
  }
runTestCase(testcase);
