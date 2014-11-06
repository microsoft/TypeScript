/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch07/7.6/7.6.1/7.6.1-6-6.js
 * @description Allow reserved words as property names by dot operator assignment, accessed via indexing: continue, for, switch
 */


function testcase() {
        var tokenCodes  = {};
        tokenCodes.continue = 0;
        tokenCodes.for = 1; 
        tokenCodes.switch = 2;
        var arr = [
            'continue', 
            'for',
            'switch'
         ];
         for (var i = 0; i < arr.length; i++) {
            if (tokenCodes[arr[i]] !== i) {
                return false;
            };
        }
        return true;
    }
runTestCase(testcase);
