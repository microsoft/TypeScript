/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.7/15.2.3.7-2-5.js
 * @description Object.defineProperties - argument 'Properties' is any interesting number
 */


function testcase() {

        var obj = { "123": 100 };
        var obj1 = Object.defineProperties(obj, -12);
        return obj === obj1;

    }
runTestCase(testcase);
