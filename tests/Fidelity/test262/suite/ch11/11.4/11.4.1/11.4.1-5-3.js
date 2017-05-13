/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch11/11.4/11.4.1/11.4.1-5-3.js
 * @description delete operator returns false when deleting a direct reference to a function name
 */


function testcase() {
  var foo = function(){};

  // Now, deleting 'foo' directly should fail;
  var d = delete foo;
  if(d === false && fnExists(foo))
    return true;
 }
runTestCase(testcase);
