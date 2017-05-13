/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch07/7.6/7.6.1/7.6.1-8-2.js
 * @description Allow reserved words as property names by set function within an object, accessed via indexing: break, case, do
 */


function testcase() {
        var test0 = 0, test1 = 1, test2 = 2;
        var tokenCodes  = {
            set break(value){
                test0 = value;        
            },
            get break(){
                return test0;
            },
            set case(value){
                test1 = value;
            },
            get case(){
                return test1;
            },
            set do(value){
                test2 = value;
            },
            get do(){
                return test2;
            }
        }; 
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
