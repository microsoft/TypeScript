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


verify.codeFixDiagnosticsAvailableAtMarkers(['1', '2', '3', '4', '5', '6', '7', '8']);
verify.rangeAfterCodeFix(
`class foo {
    constructor() { }
    instanceMethod1() { return "this is name"; }
    instanceMethod2() { return "this is name"; }
    instanceProp1 = "hello";
    instanceProp2 = undefined;
    static staticProp = "world";
    static staticMethod1() { return "this is static name"; }
    static staticMethod2() { return "this is static name"; }
}
`, /*includeWhiteSpace*/ true, /*errorCode*/ undefined, /*index*/ 0);