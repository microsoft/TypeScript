/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.15/15.4.4.15-3-20.js
 * @description Array.prototype.lastIndexOf - value of 'length' is an Object which has an own valueOf method
 */


function testcase() {

        //valueOf method will be invoked first, since hint is Number
        var obj = {
            1: true,
            2: 2,

            length: {
                valueOf: function () {
                    return 2;
                }
            }
        };

        return Array.prototype.lastIndexOf.call(obj, true) === 1 &&
            Array.prototype.lastIndexOf.call(obj, 2) === -1;
    }
runTestCase(testcase);
