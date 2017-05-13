/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch07/7.6/7.6.1/7.6.1-8-1.js
 * @description Allow reserved words as property names by set function within an object, accessed via indexing: null, true, false
 */


function testcase() {
        var test0 = 0, test1 = 1, test2 = 2;
        var tokenCodes  = {
            set null(value) {
                test0 = value;        
            },
            get null() {
                return test0;
            },
            set true(value) {
                test1 = value;        
            },
            get true() {
                return test1;
            },
            set false(value) {
                test2 = value;        
            },
            get false(){
                return test2;
            }
        }; 
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
