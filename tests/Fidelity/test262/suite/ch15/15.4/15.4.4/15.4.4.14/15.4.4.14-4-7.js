/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.14/15.4.4.14-4-7.js
 * @description Array.prototype.indexOf returns -1 if 'length' is 0 ( length is object overridden with obj w/o valueOf (toString))
 */


function testcase() {

  
  // objects inherit the default valueOf method of the Object object;
  // that simply returns the itself. Since the default valueOf() method
  // does not return a primitive value, ES next tries to convert the object
  // to a number by calling its toString() method and converting the
  // resulting string to a number.
 var i = Array.prototype.indexOf.call({length: { toString: function () { return '0';}}}, 1);
  
  if (i === -1) {
    return true;
  }
 }
runTestCase(testcase);
