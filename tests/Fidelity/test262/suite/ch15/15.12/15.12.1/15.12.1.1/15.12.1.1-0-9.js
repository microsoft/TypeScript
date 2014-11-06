/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.12/15.12.1/15.12.1.1/15.12.1.1-0-9.js
 * @description Whitespace characters can appear before/after any JSONtoken
 */


function testcase() {

    JSON.parse('\t\r \n{\t\r \n'+
                   '"property"\t\r \n:\t\r \n{\t\r \n}\t\r \n,\t\r \n' +
                   '"prop2"\t\r \n:\t\r \n'+
                        '[\t\r \ntrue\t\r \n,\t\r \nnull\t\r \n,123.456\t\r \n]'+
                     '\t\r \n}\t\r \n');  // should JOSN parse without error
    return true;
  }
runTestCase(testcase);
