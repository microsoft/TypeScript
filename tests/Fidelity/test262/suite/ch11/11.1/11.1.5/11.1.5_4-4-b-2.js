/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * Refer 11.1.5; 
 *   The production
 *      PropertyNameAndValueList :  PropertyNameAndValueList , PropertyAssignment
 *    4. If previous is not undefined then throw a SyntaxError exception if any of the following conditions are true
 *      b.IsDataDescriptor(previous) is true and IsAccessorDescriptor(propId.descriptor) is true.
 *
 * @path ch11/11.1/11.1.5/11.1.5_4-4-b-2.js
 * @description Object literal - SyntaxError if a data property definition is followed by set accessor definition with the same name
 */


function testcase() {
  try
  {
    eval("({foo : 1, set foo(x){}});");
    return false;
  }
  catch(e)
  {
    return e instanceof SyntaxError;
  }
 }
runTestCase(testcase);
