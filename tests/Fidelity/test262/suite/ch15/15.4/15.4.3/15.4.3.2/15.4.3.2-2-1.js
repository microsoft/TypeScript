/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.3/15.4.3.2/15.4.3.2-2-1.js
 * @description Array.isArray applied to an object with an array as the prototype
 */


function testcase() {

        var proto = [];
        var Con = function () { };
        Con.prototype = proto;

        var child = new Con();
        return !Array.isArray(child);
    }
runTestCase(testcase);
