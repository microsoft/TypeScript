/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch08/8.12/8.12.9/8.12.9-9-b-i_1.js
 * @description Redefine a configurable data property to be an accessor property on a newly non-extensible object
 */


function testcase() {
    var o = {};
    Object.defineProperty(o, "foo", 
                          { value: "hello", 
                            configurable: true});
    Object.preventExtensions(o);
    Object.defineProperty(o, "foo", { get: function() { return 5;} });

    var fooDescrip = Object.getOwnPropertyDescriptor(o, "foo");
    return o.foo===5 && fooDescrip.get!==undefined && fooDescrip.set===undefined && fooDescrip.value===undefined && fooDescrip.configurable===true && fooDescrip.enumerable===false && fooDescrip.writable===undefined;
}
runTestCase(testcase);
