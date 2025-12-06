///<reference path="fourslash.ts" />
// @Filename: a.ts
////const key = "dynamic";
////enum Test {
////    [|[key]|] = 1,           // error: non-literal computed property name
////    [|["a" + "b"]|] = 2,     // error: binary expression
////}

goTo.file("a.ts")
const diagnostics = test.ranges().map(range => ({
    code: 1164,
    message: "Computed property names are not allowed in enums.",
    range,
}));
verify.getSemanticDiagnostics(diagnostics)
