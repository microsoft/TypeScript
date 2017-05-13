/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.14/15.4.4.14-2-3.js
 * @description Array.prototype.indexOf - 'length' is own data property that overrides an inherited data property on an Array-like object
 */


function testcase() {

        var proto = { length: 0 };

        var Con = function () {};
        Con.prototype = proto;

        var child = new Con();
        child.length = 2;
        child[1] = true;

        return Array.prototype.indexOf.call(child, true) === 1;
    }
runTestCase(testcase);
