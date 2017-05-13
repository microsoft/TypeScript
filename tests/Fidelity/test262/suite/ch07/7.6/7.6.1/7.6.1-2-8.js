/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch07/7.6/7.6.1/7.6.1-2-8.js
 * @description Allow reserved words as property names by dot operator assignment, verified with hasOwnProperty: this, with, default
 */


function testcase() {
        var tokenCodes = {};
        tokenCodes.this = 0; 
        tokenCodes.with = 1; 
        tokenCodes.default = 2;
        var arr = [
            'this', 
            'with', 
            'default'
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
