/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * Refer 11.1.5; 
 *   The production
 *     PropertyNameAndValueList :  PropertyNameAndValueList , PropertyAssignment
 *   4. If previous is not undefined then throw a SyntaxError exception if any of the following conditions are true
 *     d.	IsAccessorDescriptor(previous) is true and IsAccessorDescriptor(propId.descriptor) is true and either both previous and propId.descriptor have [[Get]] fields or both previous and propId.descriptor have [[Set]] fields
 *
 * @path ch11/11.1/11.1.5/11.1.5_4-4-d-3.js
 * @description Object literal - SyntaxError for duplicate property name (get,set,get)
 */


function testcase() {
  try
  {
    eval("({get foo(){}, set foo(arg){}, get foo(){}});");
    return false;
  }
  catch(e)
  {
    return e instanceof SyntaxError;
  }
 }
runTestCase(testcase);
