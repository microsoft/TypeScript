/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch10/10.4/10.4.3/10.4.3-1-27-s.js
 * @description Strict Mode - checking 'this' (FunctionDeclaration defined within a FunctionDeclaration inside strict mode)
 * @onlyStrict
 */
    
function testcase() {
"use strict";
function f1() {
    function f() {
        return typeof this;
    }
    return (f()==="undefined") && ((typeof this)==="undefined");
}
return f1();
}
runTestCase(testcase);