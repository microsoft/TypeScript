/// <reference path='fourslash.ts' />

// @strict: true

//// interface A {
////   a: number;
////   b: string;
//// }
//// function f(_obj: (A | undefined)[]): string {
////   return "";
//// }
//// [|f([{}]);|]

verify.codeFix({
  index: 0,
  description: ts.Diagnostics.Add_missing_properties.message,
  newRangeContent:
`f([{
    a: 0,
    b: ""
}]);`,
});
