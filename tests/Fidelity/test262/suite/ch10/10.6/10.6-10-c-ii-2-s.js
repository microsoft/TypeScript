/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch10/10.6/10.6-10-c-ii-2-s.js
 * @description arguments[i] doesn't map to actual parameters in strict mode
 * @onlyStrict
 */


function testcase() {
  
  function foo(a,b,c)
  {
    'use strict';    
    arguments[0] = 1; arguments[1] = 'str'; arguments[2] = 2.1;
    return 10 === a && 'sss' === b && 1 === c;
  }
  return foo(10,'sss',1);
 }
runTestCase(testcase);
