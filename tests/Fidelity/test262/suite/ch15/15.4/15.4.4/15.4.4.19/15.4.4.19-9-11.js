/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch15/15.4/15.4.4/15.4.4.19/15.4.4.19-9-11.js
 * @description Array.prototype.map - returns an empty array if 'length' is 0 (subclassed Array, length overridden with obj w/o valueOf (toString))
 */


function testcase() {
        function Foo() { }
        Foo.prototype = [1, 2, 3];

        var f = new Foo();

        var o = {
            toString: function () {
                return '0';
            }
        };
        f.length = o;

        // objects inherit the default valueOf method of the Object object;
        // that simply returns the itself. Since the default valueOf() method
        // does not return a primitive value, ES next tries to convert the object
        // to a number by calling its toString() method and converting the
        // resulting string to a number.

        function cb() { }
        var a = Array.prototype.map.call(f, cb);

        if (Array.isArray(a) && a.length === 0) {
            return true;
        }
    }
runTestCase(testcase);
