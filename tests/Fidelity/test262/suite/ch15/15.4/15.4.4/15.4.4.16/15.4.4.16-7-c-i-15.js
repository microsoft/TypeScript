/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.16/15.4.4.16-7-c-i-15.js
 * @description Array.prototype.every - element to be retrieved is inherited accessor property on an Array-like object
 */


function testcase() {

        function callbackfn(val, idx, obj) {
            if (idx === 1) {
                return val !== 11;
            } else {
                return true;
            }
        }

        var proto = {};

        Object.defineProperty(proto, "1", {
            get: function () {
                return 11;
            },
            configurable: true
        });

        var Con = function () { };
        Con.prototype = proto;

        var child = new Con();
        child.length = 20;

        return !Array.prototype.every.call(child, callbackfn);
    }
runTestCase(testcase);
