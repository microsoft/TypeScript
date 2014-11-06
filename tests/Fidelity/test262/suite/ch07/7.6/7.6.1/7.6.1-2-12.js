/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch07/7.6/7.6.1/7.6.1-2-12.js
 * @description Allow reserved words as property names by dot operator assignment, verified with hasOwnProperty: const, export, import
 */


function testcase() {
        var tokenCodes  = {};
        tokenCodes.const = 0;
        tokenCodes.export = 1;
        tokenCodes.import = 2;
        var arr = [
            'const',
            'export',
            'import'
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
