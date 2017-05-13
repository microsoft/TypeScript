/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.15/15.4.4.15-3-21.js
 * @description Array.prototype.lastIndexOf - 'length' is an object that has an own valueOf method that returns an object and toString method that returns a string
 */


function testcase() {

        var toStringAccessed = false;
        var valueOfAccessed = false;

        var targetObj = this;
        var obj = {
            1: targetObj,
            length: {
                toString: function () {
                    toStringAccessed = true;
                    return '3';
                },

                valueOf: function () {
                    valueOfAccessed = true;
                    return {};
                }
            }
        };

        return Array.prototype.lastIndexOf.call(obj, targetObj) === 1 && toStringAccessed && valueOfAccessed;
    }
runTestCase(testcase);
