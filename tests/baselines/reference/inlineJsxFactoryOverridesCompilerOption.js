//// [tests/cases/conformance/jsx/inline/inlineJsxFactoryOverridesCompilerOption.tsx] ////

//// [renderer.d.ts]
declare global {
    namespace JSX {
        interface IntrinsicElements {
            [e: string]: any;
        }
    }
}
export function dom(): void;
export { dom as p };
//// [reacty.tsx]
/** @jsx dom */
import {dom} from "./renderer";
<h></h>
//// [index.tsx]
import { p } from "./renderer";
<h></h>


//// [reacty.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @jsx dom */
var renderer_1 = require("./renderer");
(0, renderer_1.dom)("h", null);
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderer_1 = require("./renderer");
(0, renderer_1.p)("h", null);
