/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.19/15.4.4.19-5-1.js
 * @description Array.prototype.map - thisArg not passed
 */


function testcase() {
  try {
    fnGlobalObject()._15_4_4_19_5_1 = true;
    var _15_4_4_19_5_1 = false;
  
    function callbackfn(val, idx, obj) {
      return this._15_4_4_19_5_1;
    }
    var srcArr = [1];
    var resArr = srcArr.map(callbackfn);
    if( resArr[0] === true)
      return true;    
	
	return false;
  }
  finally {
	delete fnGlobalObject()._15_4_4_19_5_1;
  }  
 }
runTestCase(testcase);
