/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.12/15.12.3/15.12.3-11-12.js
 * @description A JSON.stringify replacer function applied to a top level scalar can return an Array.
 */


function testcase() {
  return JSON.stringify(42, function(k, v) { return v==42 ?[4,2]:v }) === '[4,2]';
  }
runTestCase(testcase);
