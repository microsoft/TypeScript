/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.15/15.4.4.15-8-4.js
 * @description Array.prototype.lastIndexOf must return correct index(undefined)
 */


function testcase() {
  var obj = {toString:function (){return undefined;}};
  var _undefined1 = undefined;
  var _undefined2;
  var a = new Array(_undefined1,_undefined2,undefined,true,0,false,null,1,"undefined",obj,1);
  if (a.lastIndexOf(undefined) === 2) 
  {
    return true;
  }
 }
runTestCase(testcase);
