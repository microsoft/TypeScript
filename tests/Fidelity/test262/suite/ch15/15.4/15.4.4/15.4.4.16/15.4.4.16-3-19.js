/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.16/15.4.4.16-3-19.js
 * @description Array.prototype.every - value of 'length' is an Object which has an own toString method
 */


function testcase() {
        function callbackfn1(val, idx, obj) {
            return val > 10;
        }

        function callbackfn2(val, idx, obj) {
            return val > 11;
        }

        var toStringAccessed = false;
        var obj = {
            0: 12,
            1: 11,
            2: 9,

            length: {
                toString: function () {
                    toStringAccessed = true;
                    return '2';
                }
            }
        };

        // objects inherit the default valueOf() method from Object
        // that simply returns itself. Since the default valueOf() method
        // does not return a primitive value, ES next tries to convert the object
        // to a number by calling its toString() method and converting the
        // resulting string to a number.
        return Array.prototype.every.call(obj, callbackfn1) &&
            !Array.prototype.every.call(obj, callbackfn2) && toStringAccessed;
    }
runTestCase(testcase);
