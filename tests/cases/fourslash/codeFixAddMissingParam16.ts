/// <reference path="fourslash.ts" />

////function f(a: string, b: string): string
////function f(a: number, b: number): number
////function f(a: number | string, b: number | string): number | string {
////    return a + b;
////}
////f(1, 2, "")

verify.codeFix({
    description: [ts.Diagnostics.Add_missing_parameter_to_0.message, "f"],
    index: 0,
    newFileContent:
`function f(a: string, b: string, p0: string): string
function f(a: number, b: number, p0: string): number
function f(a: number | string, b: number | string, p0: string): number | string {
    return a + b;
}
f(1, 2, "")`
});
