//// [tests/cases/conformance/jsx/inline/inlineJsxFactoryWithFragmentIsError.tsx] ////

//// [renderer.d.ts]
declare global {
    namespace JSX {
        interface IntrinsicElements {
            [e: string]: any;
        }
    }
}
export function dom(): void;
export function createElement(): void;
//// [reacty.tsx]
/** @jsx React.createElement */
import * as React from "./renderer";
<><h></h></>
//// [index.tsx]
/** @jsx dom */
import { dom } from "./renderer";
<><h></h></>

//// [reacty.js]
/** @jsx React.createElement */
import * as React from "./renderer";
React.createElement(React.Fragment, null,
    React.createElement("h", null));
//// [index.js]
/** @jsx dom */
import { dom } from "./renderer";
dom(React.Fragment, null,
    dom("h", null));
