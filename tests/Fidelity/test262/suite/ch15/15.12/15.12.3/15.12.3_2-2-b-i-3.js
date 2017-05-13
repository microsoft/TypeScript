/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.12/15.12.3/15.12.3_2-2-b-i-3.js
 * @description JSON.stringify converts Boolean wrapper objects returned from a toJSON call to literal Boolean values.
 */


function testcase() {
  var obj = {
    prop:42,
    toJSON: function () {return new Boolean(true)}
    };
  return JSON.stringify([obj]) === '[true]';
  }
runTestCase(testcase);
