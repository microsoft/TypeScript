/// <reference path='fourslash.ts' />

// @allowJs: true
// @Filename: /a.js
////function [|f|]() {}
////f.prototype.bar = [|function|](){
////    this.x = 1;
////};

// Only a suggestion for `f`, not for the function expression. See GH#22240
verify.getSuggestionDiagnostics([{
    message: "This constructor function may be converted to a class declaration.",
    code: 80002,
}]);

verify.codeFix({
    description: "Convert function to an ES2015 class",
    newFileContent:
`class f {
    constructor() { }
    bar() {
        this.x = 1;
    }
}
`,
});
