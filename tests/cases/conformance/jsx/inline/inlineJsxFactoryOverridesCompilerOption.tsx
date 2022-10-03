// @jsx: react
// @jsxFactory: p
// @filename: renderer.d.ts
declare global {
    namespace JSX {
        interface IntrinsicElements {
            [e: string]: any;
        }
    }
}
export function dom(): void;
export { dom as p };
// @filename: reacty.tsx
/** @jsx dom */
import {dom} from "./renderer";
<h></h>
// @filename: index.tsx
import { p } from "./renderer";
<h></h>
