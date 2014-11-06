/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.20/15.4.4.20-9-c-i-13.js
 * @description Array.prototype.filter - element to be retrieved is own accessor property that overrides an inherited accessor property on an Array-like object
 */


function testcase() {
        function callbackfn(val, idx, obj) {
            return idx === 1 && val === 12;
        }

        var proto = {};

        Object.defineProperty(proto, "1", {
            get: function () {
                return 6;
            },
            configurable: true
        });

        var Con = function () { };
        Con.prototype = proto;

        var child = new Con();
        child.length = 10;

        Object.defineProperty(child, "1", {
            get: function () {
                return 12;
            },
            configurable: true
        });
        var newArr = Array.prototype.filter.call(child, callbackfn);

        return newArr.length === 1 && newArr[0] === 12;
    }
runTestCase(testcase);
