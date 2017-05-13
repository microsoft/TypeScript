/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.12/15.12.3/15.12.3-11-15.js
 * @description Applying JSON.stringify with a replacer function to a function returns the replacer value.
 */


function testcase() {
  return JSON.stringify(function() {}, function(k,v) {return 99}) === '99';
  }
runTestCase(testcase);
