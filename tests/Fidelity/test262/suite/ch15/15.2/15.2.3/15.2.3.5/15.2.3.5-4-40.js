/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.5/15.2.3.5-4-40.js
 * @description Object.create - ensure that if an exception is thrown it occurs in the correct order relative to prior and subsequent side-effects (15.2.3.7 step 5.a)
 */


function testcase() {

        var newObj = {};
        var props = {};
        var i = 0;

        Object.defineProperty(props, "prop1", {
            get: function () {
                i++;
                return {};
            },
            enumerable: true
        });

        Object.defineProperty(props, "prop2", {
            get: function () {
                if (1 === i++) {
                    throw new RangeError();
                } else {
                    return {};
                }
            },
            enumerable: true
        });

        try {
            newObj = Object.create({}, props);
            return false;
        } catch (e) {
            return (e instanceof RangeError) && !newObj.hasOwnProperty("prop1") && i === 2;
        }
    }
runTestCase(testcase);
