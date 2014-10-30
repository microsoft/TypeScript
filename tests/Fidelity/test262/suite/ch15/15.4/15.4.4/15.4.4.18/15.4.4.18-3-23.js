/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.18/15.4.4.18-3-23.js
 * @description Array.prototype.forEach uses inherited valueOf method when 'length' is an object with an own toString and inherited valueOf methods
 */


function testcase() {

        var testResult = false;
        var valueOfAccessed = false;
        var toStringAccessed = false;

        function callbackfn(val, idx, obj) {
            testResult = (val > 10);
        }

        var proto = {
            valueOf: function () {
                valueOfAccessed = true;
                return 2;
            }
        };

        var Con = function () { };
        Con.prototype = proto;

        var child = new Con();

        child.toString = function () {
            toStringAccessed = true;
            return '1';
        };

        var obj = {
            1: 11,
            2: 9,
            length: child
        };

        Array.prototype.forEach.call(obj, callbackfn);

        return testResult && valueOfAccessed && !toStringAccessed;
    }
runTestCase(testcase);
