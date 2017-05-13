/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.7/15.2.3.7-6-a-197.js
 * @description Object.defineProperties - 'O' is an Array, 'P' is an array index named property, 'P' property doesn't exist in 'O', test [[Writable]] of 'P' property in 'Attributes' is set as false value if [[Writable]] is absent in data descriptor 'desc'  (15.4.5.1 step 4.c)
 */


function testcase() {
        var arr = [];
        var isOwnProperty = false;
        var canWritable = false;

        Object.defineProperties(arr, {
            "0": {
                value: 1001,
                enumerable: true,
                configurable: false
            }
        });

        isOwnProperty = arr.hasOwnProperty("0");

        arr[0] = 12;

        canWritable = (arr[0] === 12);

        return isOwnProperty && !canWritable && arr[0] === 1001;
    }
runTestCase(testcase);
