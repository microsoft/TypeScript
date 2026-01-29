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
/** @jsx dom */
import { dom } from "./renderer";
dom("h", null);
//// [index.js]
import { p } from "./renderer";
p("h", null);
