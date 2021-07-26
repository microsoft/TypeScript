//// [tests/cases/conformance/jsx/inline/inlineJsxAndJsxFragPragma.tsx] ////

//// [renderer.d.ts]
declare global {
    namespace JSX {
        interface IntrinsicElements {
            [e: string]: any;
        }
    }
}
export function h(): void;
export function jsx(): void;
export function Fragment(): void;

//// [preacty.tsx]
/**
 * @jsx h
 * @jsxFrag Fragment
 */
import {h, Fragment} from "./renderer";
<><div></div></>

//// [snabbdomy.tsx]
/* @jsx jsx */
/* @jsxfrag null */
import {jsx} from "./renderer";
<><span></span></>

//// [preacty.js]
"use strict";
exports.__esModule = true;
/**
 * @jsx h
 * @jsxFrag Fragment
 */
var renderer_1 = require("./renderer");
(0, renderer_1.h)(renderer_1.Fragment, null,
    (0, renderer_1.h)("div", null));
//// [snabbdomy.js]
"use strict";
exports.__esModule = true;
/* @jsx jsx */
/* @jsxfrag null */
var renderer_1 = require("./renderer");
(0, renderer_1.jsx)(null, null,
    (0, renderer_1.jsx)("span", null));
