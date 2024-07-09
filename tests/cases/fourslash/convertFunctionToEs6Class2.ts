/// <reference path='fourslash.ts' />

// @allowNonTsExtensions: true
// @Filename: test123.js
////var foo = function() { };
////foo.prototype.instanceMethod1 = function() { return "this is name"; };
////foo.prototype.instanceMethod2 = () => { return "this is name"; };
////foo.instanceProp1 = "hello";
////foo.instanceProp2 = undefined;
////foo.staticProp = "world";
////foo.staticMethod1 = function() { return "this is static name"; };
////foo.staticMethod2 = () => "this is static name";

verify.codeFix({
    description: "Convert function to an ES2015 class",
    newFileContent:
`class foo {
    constructor() { }
    static staticMethod1() { return "this is static name"; }
    static staticMethod2() { return "this is static name"; }
    instanceMethod1() { return "this is name"; }
    instanceMethod2() { return "this is name"; }
}
foo.instanceProp1 = "hello";
foo.instanceProp2 = undefined;
foo.staticProp = "world";
`,
});
