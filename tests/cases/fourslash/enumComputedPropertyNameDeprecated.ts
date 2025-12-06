///<reference path="fourslash.ts" />
// @Filename: a.ts
////enum CHAR {
////    [|['\t']|] = 0x09,
////    [|['\n']|] = 0x0A,
////    [|[`\r`]|] = 0x0D,
////    'space' = 0x20,  // no warning for simple string literal
////}
////
////enum NoWarning {
////    A = 1,
////    B = 2,
////    "quoted" = 3,
////}

goTo.file("a.ts")
const diagnostics = test.ranges().map(range => ({
    code: 1550,
    message: "Using a string literal as an enum member name via a computed property is deprecated. Use a simple string literal instead.",
    reportsDeprecated: true,
    range,
}));
verify.getSuggestionDiagnostics(diagnostics)
