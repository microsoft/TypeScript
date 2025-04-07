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
Object.defineProperty(exports, "__esModule", { value: true });
/** @jsx React.createElement */
const React = require("./renderer");
<><h></h></>;
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @jsx dom */
const renderer_1 = require("./renderer");
<><h></h></>;
