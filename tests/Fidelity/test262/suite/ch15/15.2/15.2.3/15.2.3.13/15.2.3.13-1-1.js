/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.13/15.2.3.13-1-1.js
 * @description Object.isExtensible throws TypeError if 'O' is undefined
 */


function testcase() {

        try {
            Object.isExtensible(undefined);
        } catch (e) {
            return (e instanceof TypeError);
        }
    }
runTestCase(testcase);
