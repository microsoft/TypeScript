/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.5/15.2.3.5-4-38.js
 * @description Object.create - 'Properties' is an Arguments object which implements its own [[Get]] method to access own enumerable property (15.2.3.7 step 5.a)
 */


function testcase() {

        var argObj = (function () { return arguments; })();

        argObj.prop = {
            value: 12,
            enumerable: true
        };

        var newObj = Object.create({}, argObj);

        return newObj.hasOwnProperty("prop");
    }
runTestCase(testcase);
