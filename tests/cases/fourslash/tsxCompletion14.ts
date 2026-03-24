/// <reference path='fourslash.ts' />
//@module: commonjs
//@jsx: preserve

//// declare namespace JSX {
////     interface Element { }
////     interface IntrinsicElements {
////     }
////     interface ElementAttributesProperty { props; }
//// }

//@Filename: exporter.tsx
//// export class Thing { props: { ONE: string; TWO: number } }
//// export namespace M {
////    export declare function SFCComp(props: { Three: number; Four: string }): JSX.Element;
//// }

//@Filename: file.tsx
//// import * as Exp from './exporter';
//// var x1 = <Exp.Thing /*1*/ />;
//// var x2 = <Exp.M.SFCComp /*2*/ />;
//// var x3 = <Exp.Thing /*3*/ ></Exp.Thing>;
//// var x4 = <Exp.M.SFCComp /*4*/ ></Exp.M.SFCComp>;

verify.completions(
    { marker: ["1", "3"], exact: ["ONE", "TWO"] },
    { marker: ["2", "4"], exact: ["Four", "Three"] },
);
