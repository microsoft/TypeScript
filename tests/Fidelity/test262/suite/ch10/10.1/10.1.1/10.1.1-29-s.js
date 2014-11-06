/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch10/10.1/10.1.1/10.1.1-29-s.js
 * @description Strict Mode - The built-in Function constructor is contained in use strict code
 * @noStrict
 */


function testcase() {
        "use strict";
        var funObj = new Function("a", "eval('public = 1;');");
        funObj();
        return true;
    }
runTestCase(testcase);
