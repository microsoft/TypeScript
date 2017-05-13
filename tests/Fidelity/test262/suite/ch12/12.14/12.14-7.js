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
 * @path ch12/12.14/12.14-7.js
 * @description catch introduces scope - scope removed when exiting catch block
 */


function testcase() {
      var o = {foo: 1};
      var catchAccessed = false;
      
      try {
        throw o;
      }
      catch (expObj) {
        catchAccessed = (expObj.foo == 1);
      }

      try {
        expObj;
      }
      catch (e) {
        return catchAccessed && e instanceof ReferenceError
      }
      return false;
    }
runTestCase(testcase);
