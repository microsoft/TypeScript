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
"use strict";
exports.__esModule = true;
/** @jsx React.createElement */
var React = require("./renderer");
React.createElement(React.Fragment, null,
    React.createElement("h", null));
//// [index.js]
"use strict";
exports.__esModule = true;
/** @jsx dom */
var renderer_1 = require("./renderer");
(0, renderer_1.dom)(React.Fragment, null,
    (0, renderer_1.dom)("h", null));
