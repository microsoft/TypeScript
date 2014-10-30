/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.2/15.2.3/15.2.3.7/15.2.3.7-6-a-147.js
 * @description Object.defineProperties - 'O' is an Array, 'name' is the length property of 'O', test using inherited valueOf method when the [[Value]] field of 'desc' is an Objec with an own toString and inherited valueOf methods (15.4.5.1 step 3.c)
 */


function testcase() {

        var arr = [];
        var toStringAccessed = false;
        var valueOfAccessed = false;

        var proto = {
            value: {
                valueOf: function () {
                    valueOfAccessed = true;
                    return 2;
                }
            }
        };

        var Con = function () { };
        Con.prototype = proto;

        var child = new Con();
        Object.defineProperty(child, "value", {
            value: {
                toString: function () {
                    toStringAccessed = true;
                    return 3;
                }
            }
        });

        Object.defineProperties(arr, {
            length: child
        });
        return arr.length === 3 && toStringAccessed && !valueOfAccessed;
    }
runTestCase(testcase);
