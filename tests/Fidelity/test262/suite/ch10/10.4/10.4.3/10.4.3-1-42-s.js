/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch10/10.4/10.4.3/10.4.3-1-42-s.js
 * @description Strict Mode - checking 'this' (FunctionDeclaration defined within an Anonymous FunctionExpression with a strict directive prologue)
 * @onlyStrict
 */
    
function testcase() {
return (function () {
    "use strict";
    function f() {
        return typeof this;
    }
    return (f()==="undefined") && ((typeof this)==="undefined");
})();
}
runTestCase(testcase);