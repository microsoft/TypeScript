/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.14/15.4.4.14-3-21.js
 * @description Array.prototype.indexOf - 'length' is an object that has an own valueOf method that returns an object and toString method that returns a string
 */


function testcase() {

        var toStringAccessed = false;
        var valueOfAccessed = false;

        var obj = {
            1: true,
            length: {
                toString: function () {
                    toStringAccessed = true;
                    return '2';
                },

                valueOf: function () {
                    valueOfAccessed = true;
                    return {};
                }
            }
        };

        return Array.prototype.indexOf.call(obj, true) === 1 && toStringAccessed && valueOfAccessed;
    }
runTestCase(testcase);
