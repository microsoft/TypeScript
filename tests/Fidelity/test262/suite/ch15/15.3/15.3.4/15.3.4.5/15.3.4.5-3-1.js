/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.3/15.3.4/15.3.4.5/15.3.4.5-3-1.js
 * @description Function.prototype.bind - each arg is defined in A in list order
 */


function testcase() {

        var foo = function (x, y) {
            return new Boolean((x + y) === "ab" && arguments[0] === "a" &&
                arguments[1] === "b" && arguments.length === 2);
        };

        var obj = foo.bind({}, "a", "b");
        return obj()==true;
    }
runTestCase(testcase);
