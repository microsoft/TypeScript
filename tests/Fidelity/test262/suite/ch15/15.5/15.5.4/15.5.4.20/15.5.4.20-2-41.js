/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.5/15.5.4/15.5.4.20/15.5.4.20-2-41.js
 * @description String.prototype.trim - 'this' is an object which has an own toString and valueOf method.
 */


function testcase() {
        var toStringAccessed = false;
        var valueOfAccessed = false;
        var obj = {
            toString: function () {
                toStringAccessed = true;
                return "abc";
            },
            valueOf: function () {
                valueOfAccessed = true;
                return "cef";
            }
        };
        return (String.prototype.trim.call(obj) === "abc") && !valueOfAccessed && toStringAccessed;
    }
runTestCase(testcase);
