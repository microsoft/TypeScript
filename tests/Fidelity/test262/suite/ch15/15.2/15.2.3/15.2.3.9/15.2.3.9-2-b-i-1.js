/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.9/15.2.3.9-2-b-i-1.js
 * @description Object.freeze - The [[Wrtiable]] attribute of own data property of 'O' is set to false while other attributes are unchanged
 */


function testcase() {
        var obj = {};

        Object.defineProperty(obj, "foo", {
            value: 10,
            writable: true,
            enumerable: true,
            configurable: false
        });

        Object.freeze(obj);
        var desc = Object.getOwnPropertyDescriptor(obj, "foo");

        return dataPropertyAttributesAreCorrect(obj, "foo", 10, false, true, false) &&
            desc.writable === false && desc.configurable === false;
    }
runTestCase(testcase);
