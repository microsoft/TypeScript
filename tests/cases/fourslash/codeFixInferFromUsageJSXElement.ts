/// <reference path='fourslash.ts' />

// @noImplicitAny: true
// @jsx: react
// @module: es2015
// @moduleResolution: bundler
////declare namespace React {
////    export class Component { render(): JSX.Element | null; }
////}
////declare global {
////    namespace JSX {
////        interface Element {}
////    }
////}
////
//// export default function Component([|props |]) {
////     if (props.isLoading) {
////         return <div>...Loading < /div>;
////     }
////     else {
////         return <AnotherComponent
////             update={
////             (rec) => {
////                 return props.update(rec);
////             }
////         }
////         />;
////     }
//// }


verify.rangeAfterCodeFix("props: { isLoading: any; update: (arg0: any) => any; }",/*includeWhiteSpace*/ undefined, /*errorCode*/ undefined, 0);
