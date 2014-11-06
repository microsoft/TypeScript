/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch10/10.2/10.2.1/10.2.1.1/10.2.1.1.3/10.2.1.1.3-4-22-s.js
 * @description Strict Mode - TypeError is not thrown when changing the value of the Constructor Properties of the Global Object under strict mode (Object)
 * @onlyStrict
 */


function testcase() {
        "use strict";
        var objBak = Object;

        try {
            Object = 12;
            return true;
        } finally {
            Object = objBak;
        }
    }
runTestCase(testcase);
