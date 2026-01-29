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

//// [preacty-only-fragment.tsx]
/**
 * @jsx h
 * @jsxFrag Fragment
 */
import {h, Fragment} from "./renderer";
<></>

//// [snabbdomy-only-fragment.tsx]
/* @jsx jsx */
/* @jsxfrag null */
import {jsx} from "./renderer";
<></>

//// [preacty-only-fragment-no-jsx.tsx]
/**
 * @jsx h
 * @jsxFrag Fragment
 */
import {Fragment} from "./renderer";
<></>

//// [snabbdomy-only-fragment-no-jsx.tsx]
/* @jsx jsx */
/* @jsxfrag null */
import {} from "./renderer";
<></>

//// [preacty-no-fragment.tsx]
/**
 * @jsx h
 * @jsxFrag Fragment
 */
import {h, Fragment} from "./renderer";
<div></div>

//// [snabbdomy-no-fragment.tsx]
/* @jsx jsx */
/* @jsxfrag null */
import {jsx} from "./renderer";
<div></div>

//// [preacty-only-component.tsx]
/**
 * @jsx h
 */
import {h} from "./renderer";
function Component() { return null; }
<Component />


//// [preacty.js]
/**
 * @jsx h
 * @jsxFrag Fragment
 */
import { h, Fragment } from "./renderer";
h(Fragment, null,
    h("div", null));
//// [snabbdomy.js]
/* @jsx jsx */
/* @jsxfrag null */
import { jsx } from "./renderer";
jsx(null, null,
    jsx("span", null));
//// [preacty-only-fragment.js]
/**
 * @jsx h
 * @jsxFrag Fragment
 */
import { Fragment } from "./renderer";
h(Fragment, null);
//// [snabbdomy-only-fragment.js]
jsx(null, null);
export {};
//// [preacty-only-fragment-no-jsx.js]
/**
 * @jsx h
 * @jsxFrag Fragment
 */
import { Fragment } from "./renderer";
h(Fragment, null);
//// [snabbdomy-only-fragment-no-jsx.js]
jsx(null, null);
export {};
//// [preacty-no-fragment.js]
/**
 * @jsx h
 * @jsxFrag Fragment
 */
import { h } from "./renderer";
h("div", null);
//// [snabbdomy-no-fragment.js]
/* @jsx jsx */
/* @jsxfrag null */
import { jsx } from "./renderer";
jsx("div", null);
//// [preacty-only-component.js]
/**
 * @jsx h
 */
import { h } from "./renderer";
function Component() { return null; }
h(Component, null);
