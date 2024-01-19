/// <reference path="fourslash.ts" />

////function f(a: string): string;
////function f(a: string, b?: number): string;
////function f(a: string, b?: number): string {
////    return "";
////}
////f("", "", 1);

verify.codeFix({
    description: [ts.Diagnostics.Add_optional_parameter_to_0.message, "f"],
    index: 1,
    newFileContent:
`function f(a: string): string;
function f(a: string, p0?: string, b?: number): string;
function f(a: string, p0?: string, b?: number): string {
    return "";
}
f("", "", 1);`
});
