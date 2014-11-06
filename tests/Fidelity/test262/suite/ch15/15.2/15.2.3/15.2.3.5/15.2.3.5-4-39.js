/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.5/15.2.3.5-4-39.js
 * @description Object.create - ensure that side-effects of gets occur in the same order as they would for: for (P in props) props[P] (15.2.3.7 step 5.a)
 */


function testcase() {

        var props = {};
        props.prop1 = { value: 12, enumerable: true };
        props.prop2 = { value: true, enumerable: true };

        var tempArray = [];
        for (var p in props) {
            if (props.hasOwnProperty(p)) {
                tempArray.push(p);
            }
        }

        var newObj = Object.create({}, props);
        var index = 0;
        for (var q in newObj) {
            if (tempArray[index++] !== q && newObj.hasOwnProperty(q)) {
                return false;
            }
        }
        return true;         
    }
runTestCase(testcase);
