/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.10/15.10.7/15.10.7.1/15.10.7.1-1.js
 * @description RegExp.prototype.source is of type String
 */


function testcase() {
  return (typeof(RegExp.prototype.source)) === 'string';
 }
runTestCase(testcase);
