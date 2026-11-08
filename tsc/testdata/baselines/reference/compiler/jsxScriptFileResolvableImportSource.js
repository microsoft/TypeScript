//// [tests/cases/compiler/jsxScriptFileResolvableImportSource.tsx] ////

//// [jsx-runtime.d.ts]
export namespace JSX {
    interface IntrinsicElements {
        div: {};
    }
}
export function jsx(type: any, props: any, key?: any): any;
export const Fragment: unique symbol;

//// [index.tsx]
const x = <div />;


//// [index.js]
"use strict";
const x = _jsx("div", {});
