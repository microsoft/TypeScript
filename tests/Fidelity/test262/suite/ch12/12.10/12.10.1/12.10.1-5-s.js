/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch12/12.10/12.10.1/12.10.1-5-s.js
 * @description with statement allowed in nested Function even if its container Function is strict)
 * @onlyStrict
 */


function testcase() {
  
    Function("\'use strict\'; var f1 = Function( \"var o = {}; with (o) {};\")");
    return true;
  
 }
runTestCase(testcase);
