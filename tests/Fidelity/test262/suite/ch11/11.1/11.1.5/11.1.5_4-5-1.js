/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * Refer 11.1.5; 
 * The production
 * PropertyNameAndValueList : PropertyNameAndValueList , PropertyAssignment 
 * 5.Call the [[DefineOwnProperty]] internal method of obj with arguments propId.name, propId.descriptor, and false.
 *
 * @path ch11/11.1/11.1.5/11.1.5_4-5-1.js
 * @description Object initialization using PropertyNameAndValueList (PropertyNameAndValueList , PropertyAssignment) when property (read-only) exists in Object.prototype (Step 5)
 */


function testcase() {
        try {
            Object.defineProperty(Object.prototype, "prop2", {
                value: 100,
                writable: false,
                configurable: true
            });

            var obj = { prop1: 101, prop2: 12 };

            return obj.hasOwnProperty("prop2");
        } finally {
            delete Object.prototype.prop2;
        }
    }
runTestCase(testcase);
