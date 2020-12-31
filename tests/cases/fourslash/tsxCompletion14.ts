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
//// var x1  = <Exp.Thing /*1*/ />;
//// var x2  = <Exp.M.SFCComp /*2*/ />;
//// var x3  = <Exp.Thing /*3*/ ></Exp.Thing>;
//// var x4  = <Exp.M.SFCComp /*4*/ ></Exp.M.SFCComp>;
//// var x5  = <Exp.M.SFCComp><//*5*/>;
//// var x6  = <Exp.M.SFCComp></Exp./*6*/>;
//// var x7  = <Exp.M.SFCComp></Exp.M./*7*/>;
//// var x8  = <Exp.M.SFCComp></Exp.M.SFCComp/*8*/
//// var x9  = <Exp.M.SFCComp></Exp.M.SFCComp/*9*/>;
//// var x10 = <Exp.M.SFCComp></      Exp./*10*/>;
//// var x11 = <Exp.M><//*11*/Exp.M>;
//// var x12 = <Exp.M></Exp/*12*/>;

verify.completions(
    { marker: ["1", "3"], exact: ["ONE", "TWO"] },
    { marker: ["2", "4"], exact: ["Three", "Four"] },
    { marker: ["5"], exact: ["Exp.M.SFCComp"] },
    { marker: ["6"], exact: ["Exp.M.SFCComp"], optionalReplacementSpan: { filename: "file.tsx", pos: 230, end: 234} },
    { marker: ["7"], exact: ["Exp.M.SFCComp"], optionalReplacementSpan: { filename: "file.tsx", pos: 264, end: 270} },
    { marker: ["8"], exact: ["Exp.M.SFCComp>"], optionalReplacementSpan: { filename: "file.tsx", pos: 300, end: 313} },
    { marker: ["9"], exact: ["Exp.M.SFCComp"], optionalReplacementSpan: { filename: "file.tsx", pos: 341, end: 354} },
    { marker: ["10"], exact: ["Exp.M.SFCComp"], optionalReplacementSpan: { filename: "file.tsx", pos: 384, end: 394} },
    { marker: ["11"], exact: ["Exp.M"], optionalReplacementSpan: { filename: "file.tsx", pos: 416, end: 421} },
    { marker: ["12"], exact: ["Exp.M"], optionalReplacementSpan: { fileName: "file.tsx", pos: 443, end: 446 } },
);
