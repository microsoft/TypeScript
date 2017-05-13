/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.1/15.1.1/15.1.1.3/15.1.1.3-2.js
 * @description undefined is not writable, should throw TypeError in strict mode
 * @onlyStrict
 */

function testcase(){
  "use strict";
  var global = fnGlobalObject();
  try{
    global["undefined"] = 5;  // Should throw a TypeError as per 8.12.5
  } catch (ex) {
    if(ex instanceof TypeError){
      return true;
    } else {
      return false;
    }
  }
}

runTestCase(testcase);
