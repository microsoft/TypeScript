/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.16/15.4.4.16-3-22.js
 * @description Array.prototype.every throws TypeError exception when 'length' is an object with toString and valueOf methods that don�t return primitive values
 */


function testcase() {

        var callbackfnAccessed = false;
        var toStringAccessed = false;
        var valueOfAccessed = false;

        function callbackfn(val, idx, obj) {
            callbackfnAccessed = true;
            return val > 10;
        }

        var obj = {
            0: 11,
            1: 12,

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
            Array.prototype.every.call(obj, callbackfn);
            return false;
        } catch (ex) {
            return (ex instanceof TypeError) && toStringAccessed && valueOfAccessed && !callbackfnAccessed;
        }
    }
runTestCase(testcase);
