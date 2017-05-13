/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.5/15.2.3.5-4-152.js
 * @description Object.create - 'value' property of one property in 'Properties' is present (8.10.5 step 5)
 */


function testcase() {

        var newObj = Object.create({}, {
            prop: {
                value: 100
            }
        });

        return newObj.prop === 100;
    }
runTestCase(testcase);
