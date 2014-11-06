/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.15/15.4.4.15-5-23.js
 * @description Array.prototype.lastIndexOf - value of 'fromIndex' is an object that has an own valueOf method that returns an object and toString method that returns a string
 */


function testcase() {

        var toStringAccessed = false;
        var valueOfAccessed = false;

        var fromIndex = {
            toString: function () {
                toStringAccessed = true;
                return '1';
            },

            valueOf: function () {
                valueOfAccessed = true;
                return {};
            }
        };

        return [0, true].lastIndexOf(true, fromIndex) === 1 && toStringAccessed && valueOfAccessed;
    }
runTestCase(testcase);
