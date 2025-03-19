//// [tests/cases/compiler/defaultDeclarationEmitShadowedNamedCorrectly.ts] ////

//// [this.ts]
import * as me from "./this";
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
}
export namespace Something {
    let MyComponent = 2; // Shadow declaration, so symbol is only usable via the self-import
    export const create = make(me.default);
}

//// [this.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Something = void 0;
exports.make = make;
const me = require("./this");
function make(x) {
    return null;
}
class MyComponent {
    props;
}
exports.default = MyComponent;
var Something;
(function (Something) {
    let MyComponent = 2; // Shadow declaration, so symbol is only usable via the self-import
    Something.create = make(me.default);
})(Something || (exports.Something = Something = {}));
