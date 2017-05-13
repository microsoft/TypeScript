/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-192.js
 * @description Object.defineProperty - 'O' is an Array, 'name' is an array index named property, 'name' is own data property that overrides an inherited data property, test TypeError is thrown on updating the [[Configurable]] attribute from false to true (15.4.5.1 step 4.c)
 */


function testcase() {
        try {
            Object.defineProperty(Array.prototype, "0", {
                value: 11,
                configurable: true
            });

            var arrObj = [];
            Object.defineProperty(arrObj, "0", {
                value: 12,
                configurable: false
            });
       
            Object.defineProperty(arrObj, "0", {
                configurable: true
            });
            return false;
        } catch (e) {
            return e instanceof TypeError && Array.prototype[0] === 11 && arrObj[0] === 12;
        } finally {
            delete Array.prototype[0];
        }
    }
runTestCase(testcase);
