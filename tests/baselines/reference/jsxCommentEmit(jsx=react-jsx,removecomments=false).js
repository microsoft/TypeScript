//// [tests/cases/compiler/jsxCommentEmit.ts] ////

//// [file.tsx]
let x = "hi";
const eg1 = <div>{x}/*mid*/{x}</div>;
const eg2 = <div>/*pre*/{x}/*post*/</div>;
const eg3 = <div>/*pre*/{x}/*mid*/{x}/*post*/</div>;
const eg4 = <div>/*pre*/<span/>*post*/</div>;
const eg5 = <div>/*pre*/{/*keep me*/}/*post*/</div>;


//// [file.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var x = "hi";
var eg1 = (0, jsx_runtime_1.jsxs)("div", { children: [x, "/*mid*/", x] });
var eg2 = (0, jsx_runtime_1.jsxs)("div", { children: ["/*pre*/", x, "/*post*/"] });
var eg3 = (0, jsx_runtime_1.jsxs)("div", { children: ["/*pre*/", x, "/*mid*/", x, "/*post*/"] });
var eg4 = (0, jsx_runtime_1.jsxs)("div", { children: ["/*pre*/", (0, jsx_runtime_1.jsx)("span", {}), "*post*/"] });
var eg5 = (0, jsx_runtime_1.jsxs)("div", { children: ["/*pre*/", "/*post*/"] });
