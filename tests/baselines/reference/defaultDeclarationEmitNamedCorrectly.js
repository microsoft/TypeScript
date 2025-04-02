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
var MyComponent = /** @class */ (function () {
    function MyComponent() {
    }
    MyComponent.create = make(MyComponent);
    return MyComponent;
}());
exports.default = MyComponent;


//// [defaultDeclarationEmitNamedCorrectly.d.ts]
export interface Things<P, T> {
    p: P;
    t: T;
}
export declare function make<P, CTor>(x: {
    new (): CTor & {
        props: P;
    };
}): Things<P, CTor>;
export interface Props {
}
export default class MyComponent {
    props: Props;
    static create: Things<Props, MyComponent>;
}
