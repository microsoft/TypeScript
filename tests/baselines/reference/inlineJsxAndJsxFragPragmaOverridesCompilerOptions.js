//// [tests/cases/conformance/jsx/inline/inlineJsxAndJsxFragPragmaOverridesCompilerOptions.tsx] ////

//// [react.d.ts]
declare global {
    namespace JSX {
        interface IntrinsicElements {
            [e: string]: any;
        }
    }
}
export function createElement(): void;
export function Fragment(): void;

//// [preact.d.ts]
export function h(): void;
export function Frag(): void;

//// [snabbdom.d.ts]
export function h(): void;

//// [reacty.tsx]
import {createElement, Fragment} from "./react";
<><span></span></>

//// [preacty.tsx]
/**
 * @jsx h
 * @jsxFrag Frag
 */
import {h, Frag} from "./preact";
<><div></div></>

//// [snabbdomy.tsx]
/**
 * @jsx h
 * @jsxfrag null
 */
import {h} from "./snabbdom";
<><div></div></>

//// [mix-n-match.tsx]
/* @jsx h */
/* @jsxFrag Fragment */
import {h} from "./preact";
import {Fragment} from "./react";
<><span></span></>

//// [reacty.js]
"use strict";
exports.__esModule = true;
var react_1 = require("./react");
react_1.createElement(react_1.Fragment, null,
    react_1.createElement("span", null));
//// [preacty.js]
"use strict";
exports.__esModule = true;
/**
 * @jsx h
 * @jsxFrag Frag
 */
var preact_1 = require("./preact");
preact_1.h(preact_1.Frag, null,
    preact_1.h("div", null));
//// [snabbdomy.js]
"use strict";
exports.__esModule = true;
/**
 * @jsx h
 * @jsxfrag null
 */
var snabbdom_1 = require("./snabbdom");
snabbdom_1.h(null, null,
    snabbdom_1.h("div", null));
//// [mix-n-match.js]
"use strict";
exports.__esModule = true;
/* @jsx h */
/* @jsxFrag Fragment */
var preact_1 = require("./preact");
var react_1 = require("./react");
preact_1.h(react_1.Fragment, null,
    preact_1.h("span", null));
