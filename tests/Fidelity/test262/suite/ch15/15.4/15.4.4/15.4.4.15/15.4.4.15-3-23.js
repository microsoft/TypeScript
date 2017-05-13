/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.15/15.4.4.15-3-23.js
 * @description Array.prototype.lastIndexOf uses inherited valueOf method when 'length' is an object with an own toString and an inherited valueOf methods
 */


function testcase() {

        var toStringAccessed = false;
        var valueOfAccessed = false;

        var proto = {
            valueOf: function () {
                valueOfAccessed = true;
                return 2;
            }
        };

        var Con = function () {};
        Con.prototype = proto;

        var child = new Con();
        child.toString = function () {
            toStringAccessed = true;
            return 2;
        };

        var obj = {
            1: child,
            length: child
        };

        return Array.prototype.lastIndexOf.call(obj, child) === 1 && valueOfAccessed && !toStringAccessed;
    }
runTestCase(testcase);
