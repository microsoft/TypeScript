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
var _this = this;
exports.__esModule = true;
/** @jsx predom */
var renderer2_1 = require("./renderer2");
exports.MySFC = function (props) { return renderer2_1.predom("p", null,
    props.x,
    " + ",
    props.y,
    " = ",
    props.x + props.y,
    _this.props.children); };
var MyClass = /** @class */ (function () {
    function MyClass(props) {
        this.props = props;
    }
    MyClass.prototype.render = function () {
        return renderer2_1.predom("p", null,
            this.props.x,
            " + ",
            this.props.y,
            " = ",
            this.props.x + this.props.y,
            this.props.children);
    };
    return MyClass;
}());
exports.MyClass = MyClass;
exports.tree = renderer2_1.predom(exports.MySFC, { x: 1, y: 2 },
    renderer2_1.predom(MyClass, { x: 3, y: 4 }),
    renderer2_1.predom(MyClass, { x: 5, y: 6 }));
exports["default"] = renderer2_1.predom("h", null);
//// [index.js]
"use strict";
exports.__esModule = true;
/** @jsx dom */
var renderer_1 = require("./renderer");
var component_1 = require("./component");
var elem = component_1["default"];
elem = renderer_1.dom("h", null); // Expect assignability error here
var DOMSFC = function (props) { return renderer_1.dom("p", null,
    props.x,
    " + ",
    props.y,
    " = ",
    props.x + props.y,
    props.children); };
var DOMClass = /** @class */ (function () {
    function DOMClass(props) {
        this.props = props;
    }
    DOMClass.prototype.render = function () {
        return renderer_1.dom("p", null,
            this.props.x,
            " + ",
            this.props.y,
            " = ",
            this.props.x + this.props.y,
            this.props.children);
    };
    return DOMClass;
}());
// Should work, everything is a DOM element
var _tree = renderer_1.dom(DOMSFC, { x: 1, y: 2 },
    renderer_1.dom(DOMClass, { x: 3, y: 4 }),
    renderer_1.dom(DOMClass, { x: 5, y: 6 }));
// Should fail, no dom elements
var _brokenTree = renderer_1.dom(component_1.MySFC, { x: 1, y: 2 },
    renderer_1.dom(component_1.MyClass, { x: 3, y: 4 }),
    renderer_1.dom(component_1.MyClass, { x: 5, y: 6 }));
// Should fail, nondom isn't allowed as children of dom
var _brokenTree2 = renderer_1.dom(DOMSFC, { x: 1, y: 2 },
    component_1.tree,
    component_1.tree);
