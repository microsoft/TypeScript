/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-354-16.js
 * @description ES5 Attributes - property 'P' is an indexed data property with attributes [[Writable]]: false, [[Enumerable]]: true, [[Configurable]] : true) is non-writable using simple assignment, 'O' is an Arguments object
 */


function testcase() {
        var obj = (function () {
            return arguments;
        }());

        Object.defineProperty(obj, "0", {
            value: 2010,
            writable: false,
            enumerable: true,
            configurable: true
        });
        var valueVerify = (obj[0] === 2010);
        obj[0] = 1001;

        return valueVerify && obj[0] === 2010;
    }
runTestCase(testcase);
