// @jsx: react
// @jsxFactory: createElement
// @jsxFragmentFactory: Fragment

// @filename: react.d.ts
declare global {
    namespace JSX {
        interface IntrinsicElements {
            [e: string]: any;
        }
    }
}
export function createElement(): void;
export function Fragment(): void;

// @filename: preact.d.ts
export function h(): void;
export function Frag(): void;

// @filename: snabbdom.d.ts
export function h(): void;

// @filename: reacty.tsx
import {createElement, Fragment} from "./react";
<><span></span></>

// @filename: preacty.tsx
/**
 * @jsx h
 * @jsxFrag Frag
 */
import {h, Frag} from "./preact";
<><div></div></>

// @filename: snabbdomy.tsx
/**
 * @jsx h
 * @jsxfrag null
 */
import {h} from "./snabbdom";
<><div></div></>

// @filename: mix-n-match.tsx
/* @jsx h */
/* @jsxFrag Fragment */
import {h} from "./preact";
import {Fragment} from "./react";
<><span></span></>