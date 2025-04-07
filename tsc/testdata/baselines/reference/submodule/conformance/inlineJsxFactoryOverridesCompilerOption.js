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
const renderer_1 = require("./renderer");
<h></h>;
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const renderer_1 = require("./renderer");
<h></h>;
