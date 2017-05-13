/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-2-47.js
 * @description Object.defineProperty - TypeError exception is thrown  when 'P' is an object that neither toString nor valueOf returns a primitive value
 */


function testcase() {
        var obj = {};
        var toStringAccessed = false;
        var valueOfAccessed = false;

        var ownProp = {
            toString: function () {
                toStringAccessed = true;
                return {};
            },
            valueOf: function () {
                valueOfAccessed = true;
                return {};
            }
        };

        try {
            Object.defineProperty(obj, ownProp, {});
            return false;
        } catch (e) {
            return valueOfAccessed && toStringAccessed && e instanceof TypeError;
        }
    }
runTestCase(testcase);
