/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.14/15.4.4.14-9-3.js
 * @description Array.prototype.indexOf must return correct index(string)
 */


function testcase() {
  var obj = {toString:function (){return "false"}};
  var szFalse = "false";
  var a = new Array("false1",undefined,0,false,null,1,obj,0,szFalse, "false");
  if (a.indexOf("false") === 8)  //a[8]=szFalse
  {
    return true;
  }
 }
runTestCase(testcase);
