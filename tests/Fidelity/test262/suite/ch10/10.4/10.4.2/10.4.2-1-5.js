/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch10/10.4/10.4.2/10.4.2-1-5.js
 * @description Indirect call to eval has context set to global context (inside another eval)
 */

var __10_4_2_1_5 = "str";
function testcase() {
        try {

            var __10_4_2_1_5 = "str1";
            var r = eval("\
                          var _eval = eval; \
                          var __10_4_2_1_5 = \'str2\'; \
                          _eval(\"\'str\' === __10_4_2_1_5 \") && \
                          eval(\"\'str2\' === __10_4_2_1_5\")\
                        ");
            return r;
        } finally {
            delete this.__10_4_2_1_5;
        }
    }
runTestCase(testcase);
