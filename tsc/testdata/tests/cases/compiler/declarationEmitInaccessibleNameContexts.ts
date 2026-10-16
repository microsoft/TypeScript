// @target: es2015
// @module: esnext
// @declaration: true
// @strict: true

// Every declaration below has an inferred type that names an interface declared inside a function,
// which declaration emit cannot reference, so each reports the error for its own kind of declaration.

// @filename: hidden.ts
export function make() {
    interface Hidden { x: number }
    return { x: 1 } as Hidden;
}
export function makeClass() {
    interface HiddenProp { x: number }
    class HiddenBase { y = { x: 1 } as HiddenProp }
    return HiddenBase;
}

// @filename: index.ts
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
