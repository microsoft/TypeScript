/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.3/15.2.3.3-3-10.js
 * @description Object.getOwnPropertyDescriptor - 'P' is not an existing property
 */


function testcase() {

        var obj = {
            property: "ownDataProperty"
        };

        var desc = Object.getOwnPropertyDescriptor(obj, "propertyNonExist");

        return typeof desc === "undefined";
    }
runTestCase(testcase);
