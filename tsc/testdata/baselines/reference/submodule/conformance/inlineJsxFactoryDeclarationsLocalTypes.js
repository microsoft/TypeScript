//// [tests/cases/conformance/jsx/inline/inlineJsxFactoryDeclarationsLocalTypes.tsx] ////

//// [renderer.d.ts]
export namespace dom {
    namespace JSX {
        interface IntrinsicElements {
            [e: string]: {};
        }
        interface Element {
            __domBrand: void;
            props: {
                children?: Element[];
            };
        }
        interface ElementClass extends Element {
            render(): Element;
        }
        interface ElementAttributesProperty { props: any; }
        interface ElementChildrenAttribute { children: any; }
    }
}
export function dom(): dom.JSX.Element;
//// [renderer2.d.ts]
export namespace predom {
    namespace JSX {
        interface IntrinsicElements {
            [e: string]: {};
        }
        interface Element {
            __predomBrand: void;
            props: {
                children?: Element[];
            };
        }
        interface ElementClass extends Element {
            render(): Element;
        }
        interface ElementAttributesProperty { props: any; }
        interface ElementChildrenAttribute { children: any; }
    }
}
export function predom(): predom.JSX.Element;
//// [component.tsx]
/** @jsx predom */
import { predom } from "./renderer2"

export const MySFC = (props: {x: number, y: number, children?: predom.JSX.Element[]}) => <p>{props.x} + {props.y} = {props.x + props.y}{...this.props.children}</p>;

export class MyClass implements predom.JSX.Element {
    __predomBrand!: void;
    constructor(public props: {x: number, y: number, children?: predom.JSX.Element[]}) {}
    render() {
        return <p>
            {this.props.x} + {this.props.y} = {this.props.x + this.props.y}
            {...this.props.children}
        </p>;
    }
}
export const tree = <MySFC x={1} y={2}><MyClass x={3} y={4} /><MyClass x={5} y={6} /></MySFC>

export default <h></h>

//// [index.tsx]
/** @jsx dom */
import { dom } from "./renderer"
import prerendered, {MySFC, MyClass, tree} from "./component";
let elem = prerendered;
elem = <h></h>; // Expect assignability error here

const DOMSFC = (props: {x: number, y: number, children?: dom.JSX.Element[]}) => <p>{props.x} + {props.y} = {props.x + props.y}{props.children}</p>;

class DOMClass implements dom.JSX.Element {
    __domBrand!: void;
    constructor(public props: {x: number, y: number, children?: dom.JSX.Element[]}) {}
    render() {
        return <p>{this.props.x} + {this.props.y} = {this.props.x + this.props.y}{...this.props.children}</p>;
    }
}

// Should work, everything is a DOM element
const _tree = <DOMSFC x={1} y={2}><DOMClass x={3} y={4} /><DOMClass x={5} y={6} /></DOMSFC>

// Should fail, no dom elements
const _brokenTree = <MySFC x={1} y={2}><MyClass x={3} y={4} /><MyClass x={5} y={6} /></MySFC>

// Should fail, nondom isn't allowed as children of dom
const _brokenTree2 = <DOMSFC x={1} y={2}>{tree}{tree}</DOMSFC>


//// [component.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tree = exports.MyClass = exports.MySFC = void 0;
/** @jsx predom */
const renderer2_1 = require("./renderer2");
const MySFC = (props) => (0, renderer2_1.predom)("p", null,
    props.x,
    " + ",
    props.y,
    " = ",
    props.x + props.y,
    ...this.props.children);
exports.MySFC = MySFC;
class MyClass {
    props;
    __predomBrand;
    constructor(props) {
        this.props = props;
    }
    render() {
        return (0, renderer2_1.predom)("p", null,
            this.props.x,
            " + ",
            this.props.y,
            " = ",
            this.props.x + this.props.y,
            ...this.props.children);
    }
}
exports.MyClass = MyClass;
exports.tree = (0, renderer2_1.predom)(exports.MySFC, { x: 1, y: 2 },
    (0, renderer2_1.predom)(MyClass, { x: 3, y: 4 }),
    (0, renderer2_1.predom)(MyClass, { x: 5, y: 6 }));
exports.default = (0, renderer2_1.predom)("h", null);
//// [index.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/** @jsx dom */
const renderer_1 = require("./renderer");
const component_1 = __importStar(require("./component"));
let elem = component_1.default;
elem = (0, renderer_1.dom)("h", null); // Expect assignability error here
const DOMSFC = (props) => (0, renderer_1.dom)("p", null,
    props.x,
    " + ",
    props.y,
    " = ",
    props.x + props.y,
    props.children);
class DOMClass {
    props;
    __domBrand;
    constructor(props) {
        this.props = props;
    }
    render() {
        return (0, renderer_1.dom)("p", null,
            this.props.x,
            " + ",
            this.props.y,
            " = ",
            this.props.x + this.props.y,
            ...this.props.children);
    }
}
// Should work, everything is a DOM element
const _tree = (0, renderer_1.dom)(DOMSFC, { x: 1, y: 2 },
    (0, renderer_1.dom)(DOMClass, { x: 3, y: 4 }),
    (0, renderer_1.dom)(DOMClass, { x: 5, y: 6 }));
// Should fail, no dom elements
const _brokenTree = (0, renderer_1.dom)(component_1.MySFC, { x: 1, y: 2 },
    (0, renderer_1.dom)(component_1.MyClass, { x: 3, y: 4 }),
    (0, renderer_1.dom)(component_1.MyClass, { x: 5, y: 6 }));
// Should fail, nondom isn't allowed as children of dom
const _brokenTree2 = (0, renderer_1.dom)(DOMSFC, { x: 1, y: 2 }, component_1.tree, component_1.tree);
