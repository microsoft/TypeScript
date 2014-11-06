/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch10/10.6/10.6-6-4.js
 * @description 'length' property of arguments object for 0 argument function call is 0 even with formal parameters
 */


function testcase() {
      var arguments= undefined;
	return (function (a,b,c) {return arguments.length === 0})();
 }
runTestCase(testcase);
