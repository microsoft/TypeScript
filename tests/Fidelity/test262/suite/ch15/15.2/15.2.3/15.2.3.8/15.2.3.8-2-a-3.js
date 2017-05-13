/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.8/15.2.3.8-2-a-3.js
 * @description Object.seal - 'P' is own data property that overrides an inherited accessor property
 */


function testcase() {
        var proto = {};

        Object.defineProperty(proto, "foo", {
            get: function () {
                return 0;
            },
            configurable: true
        });

        var ConstructFun = function () { };
        ConstructFun.prototype = proto;

        var child = new ConstructFun();
        Object.defineProperty(child, "foo", {
            value: 10,
            configurable: true
        });
        var preCheck = Object.isExtensible(child);
        Object.seal(child);

        delete child.foo;
        return preCheck && child.foo === 10;
    }
runTestCase(testcase);
