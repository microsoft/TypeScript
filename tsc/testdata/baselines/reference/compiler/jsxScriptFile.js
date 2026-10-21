//// [tests/cases/compiler/jsxScriptFile.tsx] ////

//// [jsx-runtime.d.ts]
export namespace JSX {
    interface IntrinsicElements {
        div: {};
    }
}

//// [index.tsx]
const x = <div />;


//// [index.js]
"use strict";
const x = _jsx("div", {});
