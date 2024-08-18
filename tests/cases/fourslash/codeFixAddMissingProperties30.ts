/// <reference path="fourslash.ts" />

////interface A {
////    a: number;
////    b: string;
////}
////function f(_obj: A[]): string {
////    return "";
////}
////[|f([{}])|]

debugger;
verify.codeFix({
    index: 0,
    description: ts.Diagnostics.Add_missing_properties.message,
    newRangeContent:
`f([{
    a: 0,
    b: ""
}])`,
});
