/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch14/14.1/14.1-10-s.js
 * @description other directives - may follow 'use strict' directive
 * @noStrict
 */


function testcase() {

  function foo()
  {
     "use strict";
     "bogus directive";
     return (this === undefined);
  }

  return foo.call(undefined);
 }
runTestCase(testcase);
