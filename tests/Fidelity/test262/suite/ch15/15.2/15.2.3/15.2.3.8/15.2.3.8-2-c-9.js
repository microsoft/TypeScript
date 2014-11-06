/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.8/15.2.3.8-2-c-9.js
 * @description Object.seal - 'O' is an Arguments object
 */


function testcase() {

        var argObj = (function () { return arguments; })();

        var preCheck = Object.isExtensible(argObj);
        Object.seal(argObj);

        return preCheck && Object.isSealed(argObj);

    }
runTestCase(testcase);
