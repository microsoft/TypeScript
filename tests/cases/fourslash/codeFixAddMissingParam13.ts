/// <reference path="fourslash.ts" />

////function f(a: string): string;
////function f(a: string, b: number): string;
////function f(a: string, b?: number): string {
////    return "";
////}
////f("", 1, "");

verify.codeFix({
    description: [ts.Diagnostics.Add_missing_parameter_to_0.message, "f"],
    index: 0,
    newFileContent:
`function f(a: string): string;
function f(a: string, b: number, p0: string): string;
function f(a: string, b?: number, p0?: string): string {
    return "";
}
f("", 1, "");`
});
