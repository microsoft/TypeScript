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
exports.__esModule = true;
/** @jsx predom */
var renderer2_1 = require("./renderer2");
exports["default"] = (0, renderer2_1.predom)("h", null);
//// [index.js]
"use strict";
exports.__esModule = true;
/** @jsx dom */
var renderer_1 = require("./renderer");
var component_1 = require("./component");
var elem = component_1["default"];
elem = (0, renderer_1.dom)("h", null); // Expect assignability error here
