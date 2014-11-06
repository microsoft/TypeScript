/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.9/15.2.3.9-2-3.js
 * @description Object.freeze - inherited accessor properties are not frozen
 */


function testcase() {
        var proto = {};

        Object.defineProperty(proto, "Father", {
            get: function () {
                return 10;
            },
            configurable: true
        });

        var Con = function () { };
        Con.prototype = proto;

        var child = new Con();
        Object.freeze(child);

        var beforeDeleted = proto.hasOwnProperty("Father");
        delete proto.Father;
        var afterDeleted = proto.hasOwnProperty("Father");

        return beforeDeleted && !afterDeleted;
    }
runTestCase(testcase);
