/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.12/15.12.3/15.12.3-11-23.js
 * @description JSON.stringify - stringifying an object where property value ends with the union of all null character (The abstract operation Quote(value) step 2.c)
 */


function testcase() {

        var result = true;

        var expectedNullChars = new Array();
        expectedNullChars[0] = "\\u0000";
        expectedNullChars[1] = "\\u0001";
        expectedNullChars[2] = "\\u0002";
        expectedNullChars[3] = "\\u0003";
        expectedNullChars[4] = "\\u0004";
        expectedNullChars[5] = "\\u0005";
        expectedNullChars[6] = "\\u0006";
        expectedNullChars[7] = "\\u0007";
        expectedNullChars[8] = "\\b";
        expectedNullChars[9] = "\\t";
        expectedNullChars[10] = "\\n";
        expectedNullChars[11] = "\\u000b";
        expectedNullChars[12] = "\\f";
        expectedNullChars[13] = "\\r";
        expectedNullChars[14] = "\\u000e";
        expectedNullChars[15] = "\\u000f";
        expectedNullChars[16] = "\\u0010";
        expectedNullChars[17] = "\\u0011";
        expectedNullChars[18] = "\\u0012";
        expectedNullChars[19] = "\\u0013";
        expectedNullChars[20] = "\\u0014";
        expectedNullChars[21] = "\\u0015";
        expectedNullChars[22] = "\\u0016";
        expectedNullChars[23] = "\\u0017";
        expectedNullChars[24] = "\\u0018";
        expectedNullChars[25] = "\\u0019";
        expectedNullChars[26] = "\\u001a";
        expectedNullChars[27] = "\\u001b";
        expectedNullChars[28] = "\\u001c";
        expectedNullChars[29] = "\\u001d";
        expectedNullChars[30] = "\\u001e";
        expectedNullChars[31] = "\\u001f";

        for (var index in expectedNullChars) {

            var str = JSON.stringify({ "name": "John\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\u0008\u0009\u000A\u000B\u000C\u000D\u000E\u000F\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001A\u001B\u001C\u001D\u001E\u001F" });
            result = (result && str.indexOf(expectedNullChars[index]) !== -1);
        }
        return result;
    }
runTestCase(testcase);
