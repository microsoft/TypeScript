//// [tests/cases/compiler/jsxRuntimeScriptDiagnostic.tsx] ////

//// [package.json]
{
    "type": "module"
}
//// [package.json]
{
    "name": "@solidjs/web",
    "type": "module",
    "exports": {
        "./jsx-runtime": {
            "import": "./jsx-runtime.d.ts"
        }
    }
}
//// [jsx-runtime.d.ts]
export namespace JSX {
    interface Element {}
    interface IntrinsicElements {
        div: {};
    }
}
//// [script.tsx]
const scriptElement = <div>hi</div>;
//// [module.tsx]
export {};
const moduleElement = <div>hi</div>;


//// [script.jsx]
"use strict";
const scriptElement = <div>hi</div>;
//// [module.jsx]
const moduleElement = <div>hi</div>;
export {};
