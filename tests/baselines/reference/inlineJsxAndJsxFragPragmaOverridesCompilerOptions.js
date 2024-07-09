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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("./react");
(0, react_1.createElement)(react_1.Fragment, null,
    (0, react_1.createElement)("span", null));
//// [preacty.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @jsx h
 * @jsxFrag Frag
 */
var preact_1 = require("./preact");
(0, preact_1.h)(preact_1.Frag, null,
    (0, preact_1.h)("div", null));
//// [snabbdomy.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @jsx h
 * @jsxfrag null
 */
var snabbdom_1 = require("./snabbdom");
(0, snabbdom_1.h)(null, null,
    (0, snabbdom_1.h)("div", null));
//// [mix-n-match.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* @jsx h */
/* @jsxFrag Fragment */
var preact_1 = require("./preact");
var react_1 = require("./react");
(0, preact_1.h)(react_1.Fragment, null,
    (0, preact_1.h)("span", null));
