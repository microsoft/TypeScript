//// [tests/cases/compiler/reactJsxReactResolvedNodeNext.tsx] ////

//// [file.tsx]
export const a = <div></div>;
//// [package.json]
{
    "name": "@types/react",
    "version": "0.0.1",
    "main": "",
    "types": "index.d.ts",
}
//// [index.d.ts]
declare namespace JSX {
    interface IntrinsicElements { [x: string]: any; }
}
//// [jsx-runtime.d.ts]
import './';
//// [jsx-dev-runtime.d.ts]
import './';


//// [file.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
exports.a = (0, jsx_runtime_1.jsx)("div", {});
