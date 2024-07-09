// @jsx: react
// @filename: renderer.d.ts
declare global {
    namespace JSX {
        interface IntrinsicElements {
            [e: string]: {};
        }
        interface Element {
            __domBrand: void;
            children: Element[];
            props: {};
        }
        interface ElementAttributesProperty { props: any; }
        interface ElementChildrenAttribute { children: any; }
    }
}
export function dom(): JSX.Element;
// @filename: renderer2.d.ts
export namespace predom {
    namespace JSX {
        interface IntrinsicElements {
            [e: string]: {};
        }
        interface Element {
            __predomBrand: void;
            children: Element[];
            props: {};
        }
        interface ElementAttributesProperty { props: any; }
        interface ElementChildrenAttribute { children: any; }
    }
}
export function predom(): predom.JSX.Element;
// @filename: component.tsx
/** @jsx predom */
import { predom } from "./renderer2"
export default <h></h>

// @filename: index.tsx
/** @jsx dom */
import { dom } from "./renderer"
import prerendered from "./component";
let elem = prerendered;
elem = <h></h>; // Expect assignability error here
