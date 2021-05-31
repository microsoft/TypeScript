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
//// var x6  = <Exp.M.SFCComp></      [|Exp./*6*/|]>;
//// var x7  = <Exp.M.SFCComp></[|/*7*/Exp.M.SFCComp|]>;
//// var x8  = <Exp.M.SFCComp></[|Exp/*8*/|]>;
//// var x9  = <Exp.M.SFCComp></[|Exp.M./*9*/|]>;
//// var x10 = <Exp.M.SFCComp></      [|/*10*/Exp.M.Foo.Bar.Baz.Wut|]>;
//// var x11 = <Exp.M.SFCComp></[|Exp./*11*/M.SFCComp|]>;
//// var x12 = <Exp.M.SFCComp><div><span /></div></[|Exp.M./*12*/SFCComp|]>;

const ranges = test.ranges();

verify.completions(
    { marker: '1', exact: 'Exp.M.SFCComp', optionalReplacementSpan: ranges[0] },
    { marker: '2', exact: 'Exp.M.SFCComp', optionalReplacementSpan: ranges[1] },
    { marker: '3', exact: 'Exp.M.SFCComp', optionalReplacementSpan: ranges[2] },
    { marker: '4', exact: 'Exp.M.SFCComp>', optionalReplacementSpan: ranges[3] },
    { marker: '5', exact: 'Exp.M.SFCComp', optionalReplacementSpan: ranges[4] },
    { marker: '6', exact: 'Exp.M.SFCComp', optionalReplacementSpan: ranges[5] },
    { marker: '7', exact: 'Exp.M.SFCComp', optionalReplacementSpan: ranges[6] },
    { marker: '8', exact: 'Exp.M.SFCComp', optionalReplacementSpan: ranges[7] },
    { marker: '9', exact: 'Exp.M.SFCComp', optionalReplacementSpan: ranges[8] },
    { marker: '10', exact: 'Exp.M.SFCComp', optionalReplacementSpan: ranges[9] },
    { marker: '11', exact: 'Exp.M.SFCComp', optionalReplacementSpan: ranges[10] },
    { marker: '12', exact: 'Exp.M.SFCComp', optionalReplacementSpan: ranges[11] },
);
