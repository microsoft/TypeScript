/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.20/15.4.4.20-3-23.js
 * @description Array.prototype.filter uses inherited valueOf method when 'length' is an object with an own toString and inherited valueOf methods
 */


function testcase() {

        var valueOfAccessed = false;
        var toStringAccessed = false;

        function callbackfn(val, idx, obj) {
            return true;
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

        var newArr = Array.prototype.filter.call(obj, callbackfn);

        return newArr.length === 1 && newArr[0] === 11 && valueOfAccessed && !toStringAccessed;
    }
runTestCase(testcase);
