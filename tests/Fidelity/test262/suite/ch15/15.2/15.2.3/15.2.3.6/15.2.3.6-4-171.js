/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-171.js
 * @description Object.defineProperty - 'O' is an Array, 'name' is the length property of 'O', the [[Value]] field of 'desc' is less than value of  the length property, test the [[Configurable]] attribute of an inherited data property with large index named in 'O' can't stop deleting index named properties (15.4.5.1 step 3.l.ii)
 */


function testcase() {

        var arrObj = [0, 1];
        try {
            Array.prototype[1] = 2; // Not setting the [[Configurable]] attribute of property "1" to false here, since Array.prototype is a global object, and non-configurbale property can't revert to configurable
            Object.defineProperty(arrObj, "length", {
                value: 1
            });
            return arrObj.length === 1 && !arrObj.hasOwnProperty("1");
        } finally {
            delete Array.prototype[1];
        }
    }
runTestCase(testcase);
