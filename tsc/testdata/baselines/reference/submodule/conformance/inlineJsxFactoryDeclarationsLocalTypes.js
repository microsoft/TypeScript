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
const MySFC = (props) => <p>{props.x} + {props.y} = {props.x + props.y}{...this.props.children}</p>;
exports.MySFC = MySFC;
class MyClass {
    props;
    __predomBrand;
    constructor(props) {
        this.props = props;
    }
    render() {
        return <p>
            {this.props.x} + {this.props.y} = {this.props.x + this.props.y}
            {...this.props.children}
        </p>;
    }
}
exports.MyClass = MyClass;
exports.tree = <exports.MySFC x={1} y={2}><MyClass x={3} y={4}/><MyClass x={5} y={6}/></MySFC>;
exports.default = <h></h>;
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @jsx dom */
const renderer_1 = require("./renderer");
const component_1 = require("./component");
let elem = component_1.default;
elem = <h></h>; // Expect assignability error here
const DOMSFC = (props) => <p>{props.x} + {props.y} = {props.x + props.y}{props.children}</p>;
class DOMClass {
    props;
    __domBrand;
    constructor(props) {
        this.props = props;
    }
    render() {
        return <p>{this.props.x} + {this.props.y} = {this.props.x + this.props.y}{...this.props.children}</p>;
    }
}
// Should work, everything is a DOM element
const _tree = <DOMSFC x={1} y={2}><DOMClass x={3} y={4}/><DOMClass x={5} y={6}/></DOMSFC>;
// Should fail, no dom elements
const _brokenTree = <component_1.MySFC x={1} y={2}><component_1.MyClass x={3} y={4}/><component_1.MyClass x={5} y={6}/></MySFC>;
// Should fail, nondom isn't allowed as children of dom
const _brokenTree2 = <DOMSFC x={1} y={2}>{component_1.tree}{component_1.tree}</DOMSFC>;
