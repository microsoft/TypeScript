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
const react_1 = require("./react");
<><span></span></>;
//// [preacty.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @jsx h
 * @jsxFrag Frag
 */
const preact_1 = require("./preact");
<><div></div></>;
//// [snabbdomy.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @jsx h
 * @jsxfrag null
 */
const snabbdom_1 = require("./snabbdom");
<><div></div></>;
//// [mix-n-match.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* @jsx h */
/* @jsxFrag Fragment */
const preact_1 = require("./preact");
const react_1 = require("./react");
<><span></span></>;
