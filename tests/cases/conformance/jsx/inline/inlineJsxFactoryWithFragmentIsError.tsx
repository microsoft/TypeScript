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
// @filename: index.tsx
/** @jsx dom */
import { dom } from "./renderer";
<><h></h></>