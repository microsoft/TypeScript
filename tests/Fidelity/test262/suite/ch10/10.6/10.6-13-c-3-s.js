/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch10/10.6/10.6-13-c-3-s.js
 * @description arguments.callee is non-configurable in strict mode
 * @onlyStrict
 */


function testcase() {
  
  'use strict';    
  var desc = Object.getOwnPropertyDescriptor(arguments,"callee");
  return (desc.configurable === false &&
     desc.enumerable === false &&
     desc.hasOwnProperty('value') == false &&
     desc.hasOwnProperty('writable') == false &&
     desc.hasOwnProperty('get') == true &&
     desc.hasOwnProperty('set') == true);
 }
runTestCase(testcase);
