/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch08/8.12/8.12.9/8.12.9-9-c-i_2.js
 * @description Redefine a configurable accessor property to be a data property on a non-extensible object
 */


function testcase() {
    var o = {};
    Object.defineProperty(o, "foo", 
                          { get: function() { return 5;}, 
                            configurable: true});
    Object.preventExtensions(o);
    Object.defineProperty(o, "foo", 
                          { value: "hello",
                            writable: true});

    var fooDescrip = Object.getOwnPropertyDescriptor(o, "foo");
    return o.foo==="hello" && fooDescrip.get===undefined && fooDescrip.set===undefined && fooDescrip.value==="hello" && fooDescrip.configurable===true && fooDescrip.enumerable===false && fooDescrip.writable===true;
}
runTestCase(testcase);
