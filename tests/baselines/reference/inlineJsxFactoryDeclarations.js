//// [tests/cases/conformance/jsx/inline/inlineJsxFactoryDeclarations.tsx] ////

//// [renderer.d.ts]
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
//// [otherreacty.tsx]
/** @jsx React.createElement */
import * as React from "./renderer";
<h></h>
//// [other.tsx]
/** @jsx h */
import { dom as h } from "./renderer"
export const prerendered = <h></h>;
//// [othernoalias.tsx]
/** @jsx otherdom */
import { otherdom } from "./renderer"
export const prerendered2 = <h></h>;
//// [reacty.tsx]
import React from "./renderer"
export const prerendered3 = <h></h>;

//// [index.tsx]
/** @jsx dom */
import { dom } from "./renderer"
<h></h>
export * from "./other";
export * from "./othernoalias";
export * from "./reacty";


//// [otherreacty.js]
/** @jsx React.createElement */
import * as React from "./renderer";
React.createElement("h", null);
//// [other.js]
/** @jsx h */
import { dom as h } from "./renderer";
export const prerendered = h("h", null);
//// [othernoalias.js]
/** @jsx otherdom */
import { otherdom } from "./renderer";
export const prerendered2 = otherdom("h", null);
//// [reacty.js]
import React from "./renderer";
export const prerendered3 = React.createElement("h", null);
//// [index.js]
/** @jsx dom */
import { dom } from "./renderer";
dom("h", null);
export * from "./other";
export * from "./othernoalias";
export * from "./reacty";
