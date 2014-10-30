/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-151.js
 * @description Object.defineProperty - 'O' is an Array, 'name' is the length property of 'O', and the [[Value]] field of 'desc' is an Object with an own toString method and an inherited valueOf method (15.4.5.1 step 3.c), test that the inherited valueOf method is used
 */


function testcase() {

        var arrObj = [];
        var toStringAccessed = false;
        var valueOfAccessed = false;

        var proto = {
            valueOf: function () {
                valueOfAccessed = true;
                return 2;
            }
        };

        var ConstructFun = function () { };
        ConstructFun.prototype = proto;

        var child = new ConstructFun();
        child.toString = function () {
            toStringAccessed = true;
            return 3;
        };

        Object.defineProperty(arrObj, "length", {
            value: child
        });
        return arrObj.length === 2 && !toStringAccessed && valueOfAccessed;

    }
runTestCase(testcase);
