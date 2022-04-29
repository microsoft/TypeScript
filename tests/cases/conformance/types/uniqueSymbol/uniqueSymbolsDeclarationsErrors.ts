// @target: esnext
// @lib: esnext
// @module: commonjs
// @declaration: true
// @useDefineForClassFields: false

declare const s: unique symbol;
interface I { readonly readonlyType: unique symbol; }

// not allowed when emitting declarations

export const obj = {
    method1(p: typeof s): typeof s {
        return p;
    },
    method2(p: I["readonlyType"]): I["readonlyType"] {
        return p;
    }
};

export const classExpression = class {
    method1(p: typeof s): typeof s {
        return p;
    }
    method2(p: I["readonlyType"]): I["readonlyType"] {
        return p;
    }
};

export function funcInferredReturnType(obj: { method(p: typeof s): void }) {
    return obj;
}

export interface InterfaceWithPrivateNamedProperties {
    [s]: any;
}

export interface InterfaceWithPrivateNamedMethods {
    [s](): any;
}

export type TypeLiteralWithPrivateNamedProperties = {
    [s]: any;
}

export type TypeLiteralWithPrivateNamedMethods = {
    [s](): any;
}

export class ClassWithPrivateNamedProperties {
    [s]: any;
    static [s]: any;
}

export class ClassWithPrivateNamedMethods {
    [s]() {}
    static [s]() {}
}

export class ClassWithPrivateNamedAccessors {
    get [s](): any { return undefined; }
    set [s](v: any) { }
    static get [s](): any { return undefined; }
    static set [s](v: any) { }
}