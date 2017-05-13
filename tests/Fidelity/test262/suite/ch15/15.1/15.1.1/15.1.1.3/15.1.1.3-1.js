/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.1/15.1.1/15.1.1.3/15.1.1.3-1.js
 * @description undefined is not writable, should not throw in non-strict mode
 * @noStrict
 */

function testcase(){
    undefined = 5;
    if(typeof undefined !== "undefined") return false;

    var nosuchproperty;
    if(nosuchproperty !== undefined) return false;
    
    return true;
}

runTestCase(testcase);
