/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch10/10.4/10.4.3/10.4.3-1-57-s.js
 * @description Strict Mode - checking 'this' (Literal setter includes strict directive prologue)
 * @onlyStrict
 */
    
function testcase() {
var x = 2;
var o = { set foo(stuff) { "use strict"; x=this;  } }
o.foo = 3;
return x===o;
}
runTestCase(testcase);