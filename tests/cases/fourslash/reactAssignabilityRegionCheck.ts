/// <reference path="fourslash.ts" />

// @strict: true
// @jsx: react
// @reactNamespace: myReact

// @Filename: myReact.d.ts
//// export {};
//// declare global {
////     namespace JSX {
////         interface ElementClass { x: number; }
////     }
//// }

// @Filename: index.tsx
//// import * as myReact from "./myReact";
//// export class Foo {}
//// const a = <Foo></Foo>
//// [|const b = <[|Foo|]></Foo>|]
//// /*e*/

const [r0, r1] = test.ranges();
// Baseline
goTo.marker("e");
const expected = test.getSemanticDiagnostics();

// Reset checker
edit.insert("  ");

const region = {
    code: 2786,
    range: r1,
    message: "'Foo' cannot be used as a JSX component.\n  Its instance type 'Foo' is not a valid JSX element.\n    Property 'x' is missing in type 'Foo' but required in type 'ElementClass'."
};
verify.getRegionSemanticDiagnostics([r0], [region]);
verify.getSemanticDiagnostics(expected);