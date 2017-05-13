/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.7/15.2.3.7-6-a-93-2.js
 * @description Object.defineProperties will update [[Value]] attribute of indexed data property 'P' successfully when [[Configurable]] attribute is true and [[Writable]] attribute is false but not when both are false (8.12.9 - step Note & 10.a.ii.1)
 */


function testcase() {

        var obj = {};

        Object.defineProperty(obj, "0", {
            value: 1001,
            writable: false,
            configurable: true
        });
        
        Object.defineProperty(obj, "1", {
            value: 1003,
            writable: false,
            configurable: false
        });

        try {
            Object.defineProperties(obj, {
                0: {
                    value: 1002
                },
                1: {
                    value: 1004
                }
            });

            return false;
        } catch (e) {
            return e instanceof TypeError &&
                dataPropertyAttributesAreCorrect(obj, "0", 1002, false, false, true) &&
                dataPropertyAttributesAreCorrect(obj, "1", 1003, false, false, false);
        }
    }
runTestCase(testcase);
