/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch07/7.6/7.6.1/7.6.1-2-6.js
 * @description Allow reserved words as property names by dot operator assignment, verified with hasOwnProperty: continue, for, switch
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
        for(var p in tokenCodes) {       
            for(var p1 in arr) {                
                if(arr[p1] === p) {
                    if(!tokenCodes.hasOwnProperty(arr[p1])) {
                        return false;
                    };
                }
            }
        }
        return true;
    }
runTestCase(testcase);
