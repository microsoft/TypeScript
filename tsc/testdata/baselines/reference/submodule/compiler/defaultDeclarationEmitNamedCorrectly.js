//// [tests/cases/compiler/defaultDeclarationEmitNamedCorrectly.ts] ////

//// [defaultDeclarationEmitNamedCorrectly.ts]
export interface Things<P, T> {
    p: P;
    t: T;
}
export function make<P, CTor>(x: { new (): CTor & {props: P} }): Things<P, CTor> {
    return null as any;
}

export interface Props {
}

export default class MyComponent {
    props: Props;
    static create = make(MyComponent);
}

//// [defaultDeclarationEmitNamedCorrectly.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.make = make;
function make(x) {
    return null;
}
class MyComponent {
    props;
    static create = make(MyComponent);
}
exports.default = MyComponent;
