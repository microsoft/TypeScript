/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch12/12.6/12.6.4/12.6.4-1.js
 * @description The for-in Statement - a property name must not be visited more than once in any enumeration.
 */


function testcase() {
        var obj = { prop1: "abc", prop2: "bbc", prop3: "cnn" };

        var countProp1 = 0;
        var countProp2 = 0;
        var countProp3 = 0;

        for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
                if (p === "prop1") {
                    countProp1++;
                }
                if (p === "prop2") {
                    countProp2++;
                }
                if (p === "prop3") {
                    countProp3++;
                }
            }
        }
        return countProp1 === 1 && countProp2 === 1 && countProp3 === 1;
    }
runTestCase(testcase);
