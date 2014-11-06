/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.5/15.5.4/15.5.4.20/15.5.4.20-2-43.js
 * @description String.prototype.trim - 'this' is an object with an own valueOf and inherited toString methods with hint string, verify inherited toString method will be called first
 */


function testcase() {

        var toStringAccessed = false;
        var valueOfAccessed = false;

        var proto = {
            toString: function () {
                toStringAccessed = true;
                return "abc";
            }
        };

        var Con = function () { };
        Con.prototype = proto;

        var child = new Con();
        child.valueOf = function () {
            valueOfAccessed = true;
            return "efg";
        };
        return (String.prototype.trim.call(child) === "abc") && toStringAccessed && !valueOfAccessed;
    }
runTestCase(testcase);
