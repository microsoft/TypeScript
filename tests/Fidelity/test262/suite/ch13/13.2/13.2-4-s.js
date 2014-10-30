/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch13/13.2/13.2-4-s.js
 * @description StrictMode - A TypeError is thrown when a code in strict mode tries to write to 'arguments' of function instances.
 * @onlyStrict
 */


function testcase() {
        "use strict";
        try {
            var foo = function () {
            }
            foo.arguments = 20;
            return false;
        } catch (ex) {
            return ex instanceof TypeError;
        }
    }
runTestCase(testcase);
