/// <reference path="fourslash.ts" />

////interface A {
////    a: number;
////    b: string;
////}
////interface B {
////    c: A[];
////}
////[|const b: B[] = [{c: [{}]}]|]

verify.codeFix({
    index: 0,
    description: ts.Diagnostics.Add_missing_properties.message,
    newRangeContent:
`const b: B[] = [{c: [{
    a: 0,
    b: ""
}]}]`,
});
