/// <reference path='fourslash.ts' />

// @allowNonTsExtensions: true
// @Filename: test123.js
//// [|function /*1*/foo() { }
//// /*2*/foo.prototype.instanceMethod1 = function() { return "this is name"; };
//// /*3*/foo.prototype.instanceMethod2 = () => { return "this is name"; };
//// /*4*/foo.prototype.instanceProp1 = "hello";
//// /*5*/foo.prototype.instanceProp2 = undefined;
//// /*6*/foo.staticProp = "world";
//// /*7*/foo.staticMethod1 = function() { return "this is static name"; };
//// /*8*/foo.staticMethod2 = () => "this is static name";|]

['1', '2', '3', '4', '5', '6', '7', '8'].forEach(m => verify.applicableRefactorAvailableAtMarker(m));
verify.fileAfterApplyingRefactorAtMarker('1',
`class foo {
    constructor() { }
    instanceMethod1() { return "this is name"; }
    instanceMethod2() { return "this is name"; }
    static staticMethod1() { return "this is static name"; }
    static staticMethod2() { return "this is static name"; }
}
foo.prototype.instanceProp1 = "hello";
foo.prototype.instanceProp2 = undefined;
foo.staticProp = "world";
`, 'Convert to ES2015 class');