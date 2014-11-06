/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-3-140-1.js
 * @description Object.defineProperty - 'Attributes' is an Array object that uses Object's [[Get]] method to access the 'value' property of prototype object  (8.10.5 step 5.a)
 */


function testcase() {
        var obj = {};
        try {
            Array.prototype.value = "Array";
            var arrObj = [1, 2, 3];

            Object.defineProperty(obj, "property", arrObj);

            return obj.property === "Array";
        } finally {
            delete Array.prototype.value;
        }
    }
runTestCase(testcase);
