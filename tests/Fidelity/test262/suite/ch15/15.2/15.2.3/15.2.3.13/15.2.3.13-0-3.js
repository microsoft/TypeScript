/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * A newly created object using the Object contructor has its [[Extensible]]
 * property set to true by default (15.2.2.1, step 8).
 *
 * @path ch15/15.2/15.2.3/15.2.3.13/15.2.3.13-0-3.js
 * @description Object.isExtensible is true for objects created using the Object constructor
 */


function testcase() {
  var o = new Object();

  if (Object.isExtensible(o) === true) {
    return true;
  }
 }
runTestCase(testcase);
