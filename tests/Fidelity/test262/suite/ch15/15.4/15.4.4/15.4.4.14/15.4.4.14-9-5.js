/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.14/15.4.4.14-9-5.js
 * @description Array.prototype.indexOf must return correct index (Object)
 */


function testcase() {
  var obj1 = {toString:function (){return "false"}};
  var obj2 = {toString:function (){return "false"}};
  var obj3 = obj1;
  var a = new Array(false,undefined,0,false,null,{toString:function (){return "false"}},"false",obj2,obj1,obj3);
  if (a.indexOf(obj3) === 8)  //a[8] = obj1;
  {
    return true;
  }
 }
runTestCase(testcase);
