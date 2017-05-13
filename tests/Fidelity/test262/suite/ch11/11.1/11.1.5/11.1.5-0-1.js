/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * it isn't clear what specific requirements of the specificaiton are being tested here. This test should 
 * probably be replaced by some more targeted tests.  AllenWB
 *
 * @path ch11/11.1/11.1.5/11.1.5-0-1.js
 * @description Object literal - get set property
 */


function testcase() {
  var s1 = "In getter";
  var s2 = "In setter";
  var s3 = "Modified by setter";
  eval("var o = {get foo(){ return s1;},set foo(arg){return s2 = s3}};");
  if(o.foo !== s1) 
    return false;
  o.foo=10;
  if(s2 !== s3) 
    return false;
  return true;
 }
runTestCase(testcase);
