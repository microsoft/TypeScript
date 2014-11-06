/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch10/10.4/10.4.2/10.4.2-2-s.js
 * @description Strict Mode - Strict mode eval code cannot instantiate functions in the variable environment of the caller to eval
 * @onlyStrict
 */


function testcase() {
        "use strict";
        eval("(function fun(x){ return x })(10)");
        return typeof (fun) === "undefined";
    }
runTestCase(testcase);
