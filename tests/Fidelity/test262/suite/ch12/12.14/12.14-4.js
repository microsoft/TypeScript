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
 * @path ch12/12.14/12.14-4.js
 * @description catch introduces scope - block-local vars must shadow outer vars
 */


function testcase() {
  var o = { foo : 42};

  try {
    throw o;
  }
  catch (e) {
    var foo;

    if (foo === undefined) {
      return true;
    }
  }
 }
runTestCase(testcase);
