/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch11/11.4/11.4.1/11.4.1-5-1.js
 * @description delete operator returns false when deleting a direct reference to a var
 */


function testcase() {
  var x = 1;

  // Now, deleting 'x' directly should fail;
  var d = delete x;
  if(d === false && x === 1)
    return true;
 }
runTestCase(testcase);
