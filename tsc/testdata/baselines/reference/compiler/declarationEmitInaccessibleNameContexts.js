//// [tests/cases/compiler/declarationEmitInaccessibleNameContexts.ts] ////

//// [hidden.ts]
export function make() {
    interface Hidden { x: number }
    return { x: 1 } as Hidden;
}
export function makeClass() {
    interface HiddenProp { x: number }
    class HiddenBase { y = { x: 1 } as HiddenProp }
    return HiddenBase;
}

//// [index.ts]
import { make, makeClass } from "./hidden";

export const variable = make();
export let [destructured] = [make()];
export function returnType() { return make(); }
export function parameterWithInitializer(p = make()) { return 0; }
export const arrow = (p = make()) => p;

export class C {
    property = make();
    static staticProperty = make();
    #privateField = make();
    constructor(public parameterProperty = make()) {}
    method() { return make(); }
    static staticMethod() { return make(); }
    methodWithParameter(p = make()) { return 0; }
    get getter() { return make(); }
    get accessor() { return make(); }
    set accessor(v) { v; }
}

export class Derived extends makeClass() {}

export function host() {}
host.prop = make();
export const arrowHost = () => 0;
arrowHost.prop = make();

export namespace N {
    export const inNamespace = make();
    export function returnInNamespace() { return make(); }
}

export const objectLiteral = {
    nested: make(),
    method() { return make(); },
};

export function generic<T = ReturnType<typeof make>>(t?: T) { return t; }

export default make();


//// [hidden.js]
export function make() {
    return { x: 1 };
}
export function makeClass() {
    class HiddenBase {
        constructor() {
            this.y = { x: 1 };
        }
    }
    return HiddenBase;
}
//// [index.js]
var _C_privateField;
import { make, makeClass } from "./hidden";
export const variable = make();
export let [destructured] = [make()];
export function returnType() { return make(); }
export function parameterWithInitializer(p = make()) { return 0; }
export const arrow = (p = make()) => p;
export class C {
    constructor(parameterProperty = make()) {
        this.parameterProperty = parameterProperty;
        this.property = make();
        _C_privateField.set(this, make());
    }
    method() { return make(); }
    static staticMethod() { return make(); }
    methodWithParameter(p = make()) { return 0; }
    get getter() { return make(); }
    get accessor() { return make(); }
    set accessor(v) { v; }
}
_C_privateField = new WeakMap();
C.staticProperty = make();
export class Derived extends makeClass() {
}
export function host() { }
host.prop = make();
export const arrowHost = () => 0;
arrowHost.prop = make();
export var N;
(function (N) {
    N.inNamespace = make();
    function returnInNamespace() { return make(); }
    N.returnInNamespace = returnInNamespace;
})(N || (N = {}));
export const objectLiteral = {
    nested: make(),
    method() { return make(); },
};
export function generic(t) { return t; }
export default make();
