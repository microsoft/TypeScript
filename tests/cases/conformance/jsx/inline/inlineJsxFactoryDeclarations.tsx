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
export function otherdom(): void;
export function createElement(): void;
export { dom as default };
// @filename: otherreacty.tsx
/** @jsx React.createElement */
import * as React from "./renderer";
<h></h>
// @filename: other.tsx
/** @jsx h */
import { dom as h } from "./renderer"
export const prerendered = <h></h>;
// @filename: othernoalias.tsx
/** @jsx otherdom */
import { otherdom } from "./renderer"
export const prerendered2 = <h></h>;
// @filename: reacty.tsx
import React from "./renderer"
export const prerendered3 = <h></h>;

// @filename: index.tsx
/** @jsx dom */
import { dom } from "./renderer"
<h></h>
export * from "./other";
export * from "./othernoalias";
export * from "./reacty";
