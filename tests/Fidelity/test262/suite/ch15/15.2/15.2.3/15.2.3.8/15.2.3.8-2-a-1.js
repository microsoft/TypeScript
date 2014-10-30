/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.8/15.2.3.8-2-a-1.js
 * @description Object.seal - 'P' is own data property
 */


function testcase() {
        var obj = {};

        obj.foo = 10; // default [[Configurable]] attribute value of foo: true
        var preCheck = Object.isExtensible(obj);
        Object.seal(obj);

        delete obj.foo;
        return preCheck && obj.foo === 10;
    }
runTestCase(testcase);
