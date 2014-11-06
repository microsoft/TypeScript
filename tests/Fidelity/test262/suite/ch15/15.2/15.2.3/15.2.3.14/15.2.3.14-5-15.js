/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.14/15.2.3.14-5-15.js
 * @description Object.keys - own enumerable indexed data property of String object 'O' is defined in returned array
 */


function testcase() {
        var obj = new String("xyz");
        obj[-20] = -20;
        obj[20] = 20;

        Object.defineProperty(obj, "prop", {
            value: 1003,
            enumerable: false,
            configurable: true
        });

        var arr = Object.keys(obj);

        for (var i = 0; i < arr.length; i++) {
            if (!obj.hasOwnProperty(arr[i])) {
                return false;
            }
        }

        return true;
    }
runTestCase(testcase);
