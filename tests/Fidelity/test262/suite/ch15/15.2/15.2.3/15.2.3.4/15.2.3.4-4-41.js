/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.4/15.2.3.4-4-41.js
 * @description Object.getOwnPropertyNames - inherited accessor property of String object 'O' is not pushed into the returned array
 */


function testcase() {
        try {
            var str = new String("abc");

            Object.defineProperty(String.prototype, "protoProperty", {
                get: function () {
                    return "protoString";
                },
                configurable: true
            });

            var result = Object.getOwnPropertyNames(str);

            for (var p in result) {
                if (result[p] === "protoProperty") {
                    return false;
                }
            }
            return true;
        } finally {
            delete String.prototype.protoProperty;
        }
    }
runTestCase(testcase);
