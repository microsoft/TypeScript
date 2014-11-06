/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch07/7.6/7.6.1/7.6.1-7-2.js
 * @description Allow reserved words as property names by index assignment, accessed via indexing: break, case, do
 */


function testcase() {
        var tokenCodes = {};
        tokenCodes['break'] = 0;
        tokenCodes['case'] = 1;
        tokenCodes['do'] = 2;     
        var arr = [
            'break',
            'case',
            'do'
        ];
        for (var i = 0; i < arr.length; i++) {
            if (tokenCodes[arr[i]] !== i) {
                return false;
            };
        }
        return true;
    }
runTestCase(testcase);
