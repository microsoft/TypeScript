//// [tests/cases/conformance/jsx/inline/inlineJsxFactoryLocalTypeGlobalFallback.tsx] ////

//// [renderer.d.ts]
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
//// [renderer2.d.ts]
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
//// [component.tsx]
/** @jsx predom */
import { predom } from "./renderer2"
export default <h></h>

//// [index.tsx]
/** @jsx dom */
import { dom } from "./renderer"
import prerendered from "./component";
let elem = prerendered;
elem = <h></h>; // Expect assignability error here


//// [component.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @jsx predom */
const renderer2_1 = require("./renderer2");
exports.default = <h></h>;
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @jsx dom */
const renderer_1 = require("./renderer");
const component_1 = require("./component");
let elem = component_1.default;
elem = <h></h>; // Expect assignability error here
