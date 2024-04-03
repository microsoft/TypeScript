/// <reference path="fourslash.ts" />

// @strict: true
// @target: ES2020
// @lib: ES2020
// @Filename: index.ts
//// export {};
//// interface ThroughStream {
////     a: string;
//// }
//// interface ReadStream {
////     f: string;
////     g: number;
////     h: boolean;
////     i: BigInt;
////     j: symbol;
//// }
//// function foo(): ReadStream {
////     return undefined as any as ThroughStream;
//// }
//// [|function bar(): ReadStream {
////     [|return|] undefined as any as ThroughStream;
//// }|]
//// /*e*/

const [r0, r1] = test.ranges();
// Baseline
const expected = test.getSemanticDiagnostics();
console.log(JSON.stringify(expected));

// Reset checker
goTo.marker("e");
edit.insert("  ");

const region = {
    code: 2739,
    range: r1,
    "message": "Type 'ThroughStream' is missing the following properties from type 'ReadStream': f, g, h, i, j"
};
verify.getRegionSemanticDiagnostics([r0], [region]);
verify.getSemanticDiagnostics(expected);