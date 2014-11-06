/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch07/7.6/7.6.1/7.6.1-6-1.js
 * @description Allow reserved words as property names by dot operator assignment, accessed via indexing: null, true, false
 */


function testcase() {
        var tokenCodes  = {};
        tokenCodes.null = 0;
	    tokenCodes.true = 1;
	    tokenCodes.false = 2; 
        var arr = [
            'null',
            'true',
            'false'
         ];
         for (var i = 0; i < arr.length; i++) {
            if (tokenCodes[arr[i]] !== i) {
                return false;
            };
        }
        return true;
    }
runTestCase(testcase);
