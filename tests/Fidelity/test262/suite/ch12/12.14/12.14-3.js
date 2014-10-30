/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * local vars must not be visible outside with block
 * local functions must not be visible outside with block
 * local function expresssions should not be visible outside with block
 * local vars must shadow outer vars
 * local functions must shadow outer functions
 * local function expresssions must shadow outer function expressions
 * eval should use the appended object to the scope chain
 *
 * @path ch12/12.14/12.14-3.js
 * @description catch doesn't change declaration scope - var declaration are visible outside when name different from catch parameter
 */


function testcase() {
  try {
    throw new Error();
  }
  catch (e) {
    var foo = "declaration in catch";
  }
  
  return foo === "declaration in catch";
 }
runTestCase(testcase);
