/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.22/15.4.4.22-4-2.js
 * @description Array.prototype.reduceRight throws ReferenceError if callbackfn is unreferenced
 */


function testcase() {

  var arr = new Array(10);
  try {
    arr.reduceRight(foo);    
  }
  catch(e) {
    if(e instanceof ReferenceError)
      return true;  
  }

 }
runTestCase(testcase);
