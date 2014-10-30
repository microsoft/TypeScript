/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-206.js
 * @description Object.defineProperty - 'O' is an Array, 'name' is an array index named property, 'name' property doesn't exist in 'O', test [[Set]] of 'name' property in 'Attributes' is set as undefined if [[Set]] is absent in accessor descriptor 'desc' (15.4.5.1 step 4.c)
 */


function testcase() {
        var arrObj = [];
        var getFunc = function () { };

        Object.defineProperty(arrObj, "0", {
            get: getFunc,
            enumerable: true,
            configurable: true
        });

        var desc = Object.getOwnPropertyDescriptor(arrObj, "0");

        return arrObj.hasOwnProperty("0") && desc.hasOwnProperty("set") && typeof desc.set === "undefined";
    }
runTestCase(testcase);
