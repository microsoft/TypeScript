/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.3/15.3.5/15.3.5.4/15.3.5.4_2-54gs.js
 * @description Strict mode - checking access to strict function caller from strict function (Injected setter defined within strict mode)
 * @onlyStrict
 * @negative TypeError
 */


"use strict";
var o = {};
Object.defineProperty(o, "foo", { set: function(stuff) { return gNonStrict(); } });
o.foo = 9; 


function gNonStrict() {
    return gNonStrict.caller;
}

