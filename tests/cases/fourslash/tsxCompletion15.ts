/// <reference path='fourslash.ts' />
//@module: commonjs
//@jsx: preserve

//// declare module JSX {
////     interface Element { }
////     interface IntrinsicElements {
////     }
////     interface ElementAttributesProperty { props; }
//// }

//@Filename: exporter.tsx
//// export class Thing { props: { ONE: string; TWO: number } }
//// export module M {
////    export declare function SFCComp(props: { Three: number; Four: string }): JSX.Element;
//// }

//@Filename: file.tsx
//// import * as Exp from './exporter';
//// var x1  = <Exp.M.SFCComp></[|/*1*/|]>;
//// var x2  = <Exp.M.SFCComp></[|Exp./*2*/|]>;
//// var x3  = <Exp.M.SFCComp></[|Exp.M./*3*/|]>;
//// var x4  = <Exp.M.SFCComp></[|Exp.M.SFCComp/*4*/|]
//// var x5  = <Exp.M.SFCComp></[|Exp.M.SFCComp/*5*/|]>;
//// var x6 = <Exp.M.SFCComp></      [|Exp./*6*/|]>;
//// var x7 = <Exp.M></[|/*7*/Exp.M|]>;
//// var x8 = <Exp.M></[|Exp/*8*/|]>;
//// var x9 = <Exp.M></[|Exp./*9*/|]>;

test.ranges().forEach((range, marker) => {
    verify.completions({
        marker: String(marker + 1),
        optionalReplacementSpan: range,
    });
});
