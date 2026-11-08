//// [tests/cases/compiler/jsxImportSourceModuleMissing.tsx] ////

//// [index.tsx]
export const x = <div />;


//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
const jsx_runtime_1 = require("solid-js/jsx-runtime");
exports.x = (0, jsx_runtime_1.jsx)("div", {});
