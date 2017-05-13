/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch08/8.12/8.12.5/8.12.5-5-b_1.js
 * @description Changing the value of an accessor property should not affect it's property descriptor attributes.
 */


function testcase() {
    var tempObj = {};
    
    Object.defineProperty(tempObj, "reduce", { get: function() {return 456;}, enumerable:false, set: function() {;}});
    var origReduce = tempObj.reduce;
    var origDesc = Object.getOwnPropertyDescriptor(tempObj, "reduce");

    var newDesc;
    
    try {
        tempObj.reduce = 123;
        newDesc = Object.getOwnPropertyDescriptor(tempObj, "reduce");
        var descArray = [origDesc, newDesc];
        
        for (var j in descArray) {
            for (var i in descArray[j]) {
                if (origDesc[i]!==newDesc[i]) {
                    return false;
                }
            }
        }
        return tempObj.reduce===456;        
    
    } finally {
        tempObj.reduce = origReduce;
    }
}
runTestCase(testcase);
