//// [uniqueSymbolsDeclarationsErrors.ts]
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

//// [uniqueSymbolsDeclarationsErrors.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassWithPrivateNamedAccessors = exports.ClassWithPrivateNamedMethods = exports.ClassWithPrivateNamedProperties = exports.funcInferredReturnType = exports.classExpression = exports.obj = void 0;
// not allowed when emitting declarations
exports.obj = {
    method1(p) {
        return p;
    },
    method2(p) {
        return p;
    }
};
const classExpression = class {
    method1(p) {
        return p;
    }
    method2(p) {
        return p;
    }
};
exports.classExpression = classExpression;
function funcInferredReturnType(obj) {
    return obj;
}
exports.funcInferredReturnType = funcInferredReturnType;
class ClassWithPrivateNamedProperties {
}
exports.ClassWithPrivateNamedProperties = ClassWithPrivateNamedProperties;
class ClassWithPrivateNamedMethods {
    [s]() { }
    static [s]() { }
}
exports.ClassWithPrivateNamedMethods = ClassWithPrivateNamedMethods;
class ClassWithPrivateNamedAccessors {
    get [s]() { return undefined; }
    set [s](v) { }
    static get [s]() { return undefined; }
    static set [s](v) { }
}
exports.ClassWithPrivateNamedAccessors = ClassWithPrivateNamedAccessors;


//// [uniqueSymbolsDeclarationsErrors.d.ts]
declare const s: unique symbol;
interface I {
    readonly readonlyType: unique symbol;
}
export declare const obj: {
    method1(p: typeof s): typeof s;
    method2(p: I["readonlyType"]): I["readonlyType"];
};
export declare const classExpression: {
    new (): {
        method1(p: typeof s): typeof s;
        method2(p: I["readonlyType"]): I["readonlyType"];
    };
};
export declare function funcInferredReturnType(obj: {
    method(p: typeof s): void;
}): {
    method(p: typeof s): void;
};
export interface InterfaceWithPrivateNamedProperties {
    [s]: any;
}
export interface InterfaceWithPrivateNamedMethods {
    [s](): any;
}
export declare type TypeLiteralWithPrivateNamedProperties = {
    [s]: any;
};
export declare type TypeLiteralWithPrivateNamedMethods = {
    [s](): any;
};
export declare class ClassWithPrivateNamedProperties {
    [s]: any;
    static [s]: any;
}
export declare class ClassWithPrivateNamedMethods {
    [s](): void;
    static [s](): void;
}
export declare class ClassWithPrivateNamedAccessors {
    get [s](): any;
    set [s](v: any);
    static get [s](): any;
    static set [s](v: any);
}
export {};
