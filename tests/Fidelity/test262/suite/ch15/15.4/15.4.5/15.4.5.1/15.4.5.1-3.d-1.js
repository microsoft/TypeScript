/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.5/15.4.5.1/15.4.5.1-3.d-1.js
 * @description Throw RangeError if attempt to set array length property to 4294967296 (2**32)
 */


function testcase() {
  try {
      [].length = 4294967296 ;
  } catch (e) {
	if (e instanceof RangeError) return true;
  }
 }
runTestCase(testcase);
