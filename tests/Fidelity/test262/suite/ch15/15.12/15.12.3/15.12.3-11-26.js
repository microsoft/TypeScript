/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.12/15.12.3/15.12.3-11-26.js
 * @description JSON.stringify - the last element of the concatenation is ']' (The abstract operation JA(value) step 10.b.iii)
 */


function testcase() {
        var arrObj = [];
        arrObj[0] = "a";
        arrObj[1] = "b";
        arrObj[2] = "c";

        var jsonText = JSON.stringify(arrObj, undefined, "").toString();
        return jsonText.substr(jsonText.length - 1, 1) === "]";
    }
runTestCase(testcase);
