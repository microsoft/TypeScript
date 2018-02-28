/// <reference path='fourslash.ts' />

// @allowNonTsExtensions: true
// @Filename: test123.js
////function /*diagStart*/foo/*diagEnd*/() { }
////foo.prototype.instanceMethod1 = function() { return "this is name"; };
////foo.prototype.instanceMethod2 = () => { return "this is name"; };
////foo.prototype.instanceProp1 = "hello";
////foo.prototype.instanceProp2 = undefined;
////foo.staticProp = "world";
////foo.staticMethod1 = function() { return "this is static name"; };
////foo.staticMethod2 = () => "this is static name";

verify.getSuggestionDiagnostics([{
    message: "Function may be converted to a class.",
    start: test.marker("diagStart").position,
    length: test.marker("diagEnd").position - test.marker("diagStart").position,
    category: "suggestion",
    code: 80002,
}]);

verify.codeFix({
    description: "Convert function to an ES2015 class",
    newFileContent:
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
`,
});
