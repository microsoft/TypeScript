/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.3/15.3.5/15.3.5.4/15.3.5.4_2-94gs.js
 * @description Strict mode - checking access to strict function caller from non-strict function expression (FunctionDeclaration includes strict directive prologue)
 * @noStrict
 * @negative TypeError
 */

var gNonStrict = function () {
    return gNonStrict.caller || gNonStrict.caller.throwTypeError;
}

function f() {
    "use strict";
    return gNonStrict();
}
f();
