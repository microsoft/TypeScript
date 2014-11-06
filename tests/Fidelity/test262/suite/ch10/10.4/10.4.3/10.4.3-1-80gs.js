/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch10/10.4/10.4.3/10.4.3-1-80gs.js
 * @description Strict - checking 'this' from a global scope (strict function declaration called by Function.prototype.bind(globalObject)())
 * @onlyStrict
 */

function f() { "use strict"; return this;};
if (f.bind(fnGlobalObject())() !== fnGlobalObject()){
    throw "'this' had incorrect value!";
}