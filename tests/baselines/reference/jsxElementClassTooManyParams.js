//// [tests/cases/compiler/jsxElementClassTooManyParams.tsx] ////

//// [jsxElementClassTooManyParams.tsx]
namespace JSX {
    export interface Element {}
    export interface IntrinsicClassAttributes<TClass, TOther=never> {
        ref?: TClass;
        item?: TOther;
    }
    export interface ElementClass extends Element {}
    export interface ElementAttributesProperty { props: {}; }
    export interface ElementChildrenAttribute { children: {}; }
    export interface IntrinsicAttributes {}
    export interface IntrinsicElements { [key: string]: Element }
}
class ElemClass<T extends {x: number}> implements JSX.ElementClass {
    constructor(public props: T) {}
}
const elem = <ElemClass x={12} y={24} />

//// [jsxElementClassTooManyParams.jsx]
"use strict";
var ElemClass = /** @class */ (function () {
    function ElemClass(props) {
        this.props = props;
    }
    return ElemClass;
}());
var elem = <ElemClass x={12} y={24}/>;
