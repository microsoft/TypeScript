/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.19/15.4.4.19-3-19.js
 * @description Array.prototype.map - value of 'length' is an Object which has an own toString method
 */


function testcase() {

        function callbackfn(val, idx, obj) {
            return val < 10;
        }

        var obj = {
            0: 11,
            1: 9,

            length: {
                toString: function () {
                    return '2';
                }
            }
        };

        var newArr = Array.prototype.map.call(obj, callbackfn);

        return newArr.length === 2;
    }
runTestCase(testcase);
