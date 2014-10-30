/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * create sets the [[Prototype]] of the created object to first parameter.
 * This can be checked using isPrototypeOf, or getPrototypeOf.
 *
 * @path ch15/15.2/15.2.3/15.2.3.5/15.2.3.5-3-1.js
 * @description Object.create sets the prototype of the passed-in object
 */


function testcase() {
    function base() {}
    var b = new base();
    var d = Object.create(b);

    if (Object.getPrototypeOf(d) === b &&
        b.isPrototypeOf(d) === true) {
      return true;
    }
 }
runTestCase(testcase);
