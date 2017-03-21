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
//// var x1 = <Exp.Thing /*1*/ />;
//// var x2 = <Exp.M.SFCComp /*2*/ />;
//// var x3 = <Exp.Thing /*3*/ ></Exp.Thing>;
//// var x4 = <Exp.M.SFCComp /*4*/ ></Exp.M.SFCComp>;


goTo.marker("1");
verify.completionListCount(2);
verify.completionListContains('ONE');
verify.completionListContains('TWO');

goTo.marker("2");
verify.completionListCount(2);
verify.completionListContains("Three");
verify.completionListContains("Four");

goTo.marker("3");
verify.completionListCount(2);
verify.completionListContains('ONE');
verify.completionListContains('TWO');

goTo.marker("4");
verify.completionListCount(2);
verify.completionListContains("Three");
verify.completionListContains("Four");
