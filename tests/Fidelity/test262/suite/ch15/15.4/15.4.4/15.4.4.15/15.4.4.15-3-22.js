/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.15/15.4.4.15-3-22.js
 * @description Array.prototype.lastIndexOf throws TypeError exception when 'length' is an object with toString and valueOf methods that don�t return primitive values
 */


function testcase() {

        var toStringAccessed = false;
        var valueOfAccessed = false;

        var obj = {
            1: true,
            length: {
                toString: function () {
                    toStringAccessed = true;
                    return {};
                },

                valueOf: function () {
                    valueOfAccessed = true;
                    return {};
                }
            }
        };

        try {
            Array.prototype.lastIndexOf.call(obj, true);
            return false;
        } catch (e) {
            return toStringAccessed && valueOfAccessed;
        }
    }
runTestCase(testcase);
