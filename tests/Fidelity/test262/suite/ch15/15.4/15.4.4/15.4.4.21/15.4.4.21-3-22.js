/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.21/15.4.4.21-3-22.js
 * @description Array.prototype.reduce throws TypeError exception - 'length' is an object with toString and valueOf methods that don�t return primitive values
 */


function testcase() {

        var accessed = false;
        var valueOfAccessed = false;
        var toStringAccessed = false;

        function callbackfn(prevVal, curVal, idx, obj) {
            accessed = true;
            return true;
        }

        var obj = {
            1: 11,
            2: 12,

            length: {
                valueOf: function () {
                    valueOfAccessed = true;
                    return {};
                },
                toString: function () {
                    toStringAccessed = true;
                    return {};
                }
            }
        };

        try {
            Array.prototype.reduce.call(obj, callbackfn, 1);
            return false;
        } catch (ex) {
            return (ex instanceof TypeError) && !accessed && toStringAccessed && valueOfAccessed;
        }
    }
runTestCase(testcase);
