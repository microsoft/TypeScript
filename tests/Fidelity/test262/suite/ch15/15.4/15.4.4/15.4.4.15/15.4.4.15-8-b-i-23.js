/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.15/15.4.4.15-8-b-i-23.js
 * @description Array.prototype.lastIndexOf - This object is the global object
 */


function testcase() {

        var targetObj = {};
        try {
            var oldLen = fnGlobalObject().length;
            fnGlobalObject()[0] = targetObj;
            fnGlobalObject()[100] = "100";
            fnGlobalObject()[200] = "200";
            fnGlobalObject().length = 200;
            return 0 === Array.prototype.lastIndexOf.call(fnGlobalObject(), targetObj) &&
                100 === Array.prototype.lastIndexOf.call(fnGlobalObject(), "100") &&
                -1 === Array.prototype.lastIndexOf.call(fnGlobalObject(), "200");
        } finally {
            delete fnGlobalObject()[0];
            delete fnGlobalObject()[100];
            delete fnGlobalObject()[200];
            fnGlobalObject().length = oldLen;
        }
    }
runTestCase(testcase);
