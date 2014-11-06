/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch08/8.12/8.12.5/8.12.5-3-b_1.js
 * @description Changing the value of a data property should not affect it's non-value property descriptor attributes.
 */


function testcase() {
    var origReduce = Array.prototype.reduce;
    var origDesc = Object.getOwnPropertyDescriptor(Array.prototype, "reduce");
    var newDesc;
    
    try {
        Array.prototype.reduce = function () {;};
        newDesc = Object.getOwnPropertyDescriptor(Array.prototype, "reduce");
        var descArray = [origDesc, newDesc];
        
        for (var j in descArray) {  //Ensure no attributes are magically added to newDesc
            for (var i in descArray[j]) {
                if (i==="value") {
                    if (origDesc[i]===newDesc[i]) {
                        return false;
                    }
                }
                else if (origDesc[i]!==newDesc[i]) {
                    return false;
                }
            }
        }
        return true;        
    
    } finally {
        Array.prototype.reduce = origReduce;
    }
}
runTestCase(testcase);
