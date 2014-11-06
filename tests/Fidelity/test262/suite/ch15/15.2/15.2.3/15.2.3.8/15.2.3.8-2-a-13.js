/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.8/15.2.3.8-2-a-13.js
 * @description Object.seal - 'P' is own property of a RegExp object that uses Object's [[GetOwnProperty]]
 */


function testcase() {
        var regObj = new RegExp();

        regObj.foo = 10;
        var preCheck = Object.isExtensible(regObj);
        Object.seal(regObj);

        delete regObj.foo;
        return preCheck && regObj.foo === 10;
    }
runTestCase(testcase);
