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
//// [index.tsx]
/** @jsx dom */
import { dom } from "./renderer";
<><h></h></>

//// [index.js]
"use strict";
exports.__esModule = true;
/** @jsx dom */
var renderer_1 = require("./renderer");
renderer_1.dom(React.Fragment, null,
    renderer_1.dom("h", null));
