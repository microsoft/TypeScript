/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.19/15.4.4.19-3-21.js
 * @description Array.prototype.map - 'length' is an object that has an own valueOf method that returns an object and toString method that returns a string
 */


function testcase() {

        function callbackfn(val, idx, obj) {
            return val < 10;
        }

        var firstStepOccured = false;
        var secondStepOccured = false;
        var obj = {
            0: 11,
            1: 9,

            length: {
                valueOf: function () {
                    firstStepOccured = true;
                    return {};
                },
                toString: function () {
                    secondStepOccured = true;
                    return '2';
                }
            }
        };

        var newArr = Array.prototype.map.call(obj, callbackfn);

        return newArr.length === 2 && firstStepOccured && secondStepOccured;
    }
runTestCase(testcase);
