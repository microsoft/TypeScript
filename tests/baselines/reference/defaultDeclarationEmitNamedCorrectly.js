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
exports.__esModule = true;
exports.make = void 0;
function make(x) {
    return null;
}
exports.make = make;
var MyComponent = /** @class */ (function () {
    function MyComponent() {
    }
    MyComponent.create = make(MyComponent);
    return MyComponent;
}());
exports["default"] = MyComponent;


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
