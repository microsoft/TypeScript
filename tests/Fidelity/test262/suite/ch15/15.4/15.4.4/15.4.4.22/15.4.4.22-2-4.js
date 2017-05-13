/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.22/15.4.4.22-2-4.js
 * @description Array.prototype.reduceRight - 'length' is own data property that overrides an inherited data property on an Array
 */


function testcase() {

        var accessed = false;
        var arrProtoLen;
        function callbackfn(prevVal, curVal, idx, obj) {
            accessed = true;
            return obj.length === 2;
        }

        try {
            arrProtoLen = Array.prototype.length;
            Array.prototype.length = 0;

            return [12, 11].reduceRight(callbackfn, 11) && accessed;
        } finally {
            Array.prototype.length = arrProtoLen;
        }

    }
runTestCase(testcase);
