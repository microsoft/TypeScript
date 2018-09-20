// @jsx: react
// @filename: renderer.d.ts
declare global {
    namespace JSX {
        interface IntrinsicElements {
            [e: string]: any;
        }
    }
}
export function dom(): void;
export function createElement(): void;
// @filename: reacty.tsx
/** @jsx React.createElement */
import * as React from "./renderer";
<><h></h></>
// @filename: index.tsx
/** @jsx dom */
import { dom } from "./renderer";
<><h></h></>