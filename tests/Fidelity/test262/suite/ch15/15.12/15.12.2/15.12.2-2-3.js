/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.12/15.12.2/15.12.2-2-3.js
 * @description JSON.parse - parsing an object where property name ends with a null character
 */


function testcase() {

        var result = true;

        var nullChars = new Array();
        nullChars[0] = '\"\u0000\"';
        nullChars[1] = '\"\u0001\"';
        nullChars[2] = '\"\u0002\"';
        nullChars[3] = '\"\u0003\"';
        nullChars[4] = '\"\u0004\"';
        nullChars[5] = '\"\u0005\"';
        nullChars[6] = '\"\u0006\"';
        nullChars[7] = '\"\u0007\"';
        nullChars[8] = '\"\u0008\"';
        nullChars[9] = '\"\u0009\"';
        nullChars[10] = '\"\u000A\"';
        nullChars[11] = '\"\u000B\"';
        nullChars[12] = '\"\u000C\"';
        nullChars[13] = '\"\u000D\"';
        nullChars[14] = '\"\u000E\"';
        nullChars[15] = '\"\u000F\"';
        nullChars[16] = '\"\u0010\"';
        nullChars[17] = '\"\u0011\"';
        nullChars[18] = '\"\u0012\"';
        nullChars[19] = '\"\u0013\"';
        nullChars[20] = '\"\u0014\"';
        nullChars[21] = '\"\u0015\"';
        nullChars[22] = '\"\u0016\"';
        nullChars[23] = '\"\u0017\"';
        nullChars[24] = '\"\u0018\"';
        nullChars[25] = '\"\u0019\"';
        nullChars[26] = '\"\u001A\"';
        nullChars[27] = '\"\u001B\"';
        nullChars[28] = '\"\u001C\"';
        nullChars[29] = '\"\u001D\"';
        nullChars[30] = '\"\u001E\"';
        nullChars[31] = '\"\u001F\"';

        for (var index in nullChars) {
            try {
                var obj = JSON.parse('{' + "name" + nullChars[index] + ' : "John" } ');
                result = (result && false);
            } catch (e) {
                result = (result && (e instanceof SyntaxError));
            }
        }
        return result;
    }
runTestCase(testcase);
