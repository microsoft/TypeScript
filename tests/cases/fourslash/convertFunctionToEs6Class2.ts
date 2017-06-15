/// <reference path='fourslash.ts' />

// @allowNonTsExtensions: true
// @Filename: test123.js
//// [|var /*1*/foo = function() { };
//// /*2*/foo.prototype.instanceMethod1 = function() { return "this is name"; };
//// /*3*/foo.prototype.instanceMethod2 = () => { return "this is name"; };
//// /*4*/foo.instanceProp1 = "hello";
//// /*5*/foo.instanceProp2 = undefined;
//// /*6*/foo.staticProp = "world";
//// /*7*/foo.staticMethod1 = function() { return "this is static name"; };
//// /*8*/foo.staticMethod2 = () => "this is static name";|]


['1', '2', '3', '4', '5', '6', '7', '8'].forEach(m => verify.applicableRefactorAvailableAtMarker(m));
verify.fileAfterApplyingRefactorAtMarker('4',
`class foo {
    constructor() { }
    instanceMethod1() { return "this is name"; }
    instanceMethod2() { return "this is name"; }
    static staticMethod1() { return "this is static name"; }
    static staticMethod2() { return "this is static name"; }
}
foo.instanceProp1 = "hello";
foo.instanceProp2 = undefined;
foo.staticProp = "world";
`, 'Convert to ES2015 class', 'convert');
