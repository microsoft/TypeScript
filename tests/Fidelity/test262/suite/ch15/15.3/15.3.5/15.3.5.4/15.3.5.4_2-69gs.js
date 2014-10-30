/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.3/15.3.5/15.3.5.4/15.3.5.4_2-69gs.js
 * @description Strict mode - checking access to strict function caller from non-strict function (strict function declaration called by Function.prototype.call(globalObject))
 * @noStrict
 * @negative TypeError
 */


function f() { "use strict"; return gNonStrict();};
f.call(fnGlobalObject());


function gNonStrict() {
    return gNonStrict.caller || gNonStrict.caller.throwTypeError;
}

