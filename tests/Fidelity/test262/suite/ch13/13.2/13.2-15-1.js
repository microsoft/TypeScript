/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch13/13.2/13.2-15-1.js
 * @description Function Object has length as its own property and does not invoke the setter defined on Function.prototype.length (Step 15)
 */


function testcase() {
            var fun = function (x, y) { };

            var verifyValue = false;
            verifyValue = (fun.hasOwnProperty("length") && fun.length === 2);

            var verifyWritable = false;
            fun.length = 1001;
            verifyWritable = (fun.length === 1001);

            var verifyEnumerable = false;
            for (var p in fun) {
                if (p === "length") {
                    verifyEnumerable = true;
                }
            }

            var verifyConfigurable = false;
            delete fun.length;
            verifyConfigurable = fun.hasOwnProperty("length");

            return verifyValue && !verifyWritable && !verifyEnumerable && verifyConfigurable;
        }
runTestCase(testcase);
