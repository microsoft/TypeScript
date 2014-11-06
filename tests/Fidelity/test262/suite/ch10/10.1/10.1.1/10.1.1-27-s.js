/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch10/10.1/10.1.1/10.1.1-27-s.js
 * @description Strict Mode - Function code of Accessor PropertyAssignment contains Use Strict Directive which appears in the middle of the block(getter)
 * @noStrict
 */


function testcase() {
        var obj = {};
        Object.defineProperty(obj, "accProperty", {
            get: function () {
                eval("public = 1;");
                "use strict";
                return 11;
            }
        });
        return obj.accProperty === 11 && public === 1;
    }
runTestCase(testcase);
