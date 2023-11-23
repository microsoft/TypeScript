//// [tests/cases/conformance/types/uniqueSymbol/uniqueSymbolsDeclarationsErrors.ts] ////

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

export function funcInferredReturnType(obj: { method(p: typeof s): void }): {
    method(p: typeof s): void;
} {
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
    [s](): void {}
    static [s](): void {}
}

export class ClassWithPrivateNamedAccessors {
    get [s](): any { return undefined; }
    set [s](v: any) { }
    static get [s](): any { return undefined; }
    static set [s](v: any) { }
}

/// [Declarations] ////



//// [uniqueSymbolsDeclarationsErrors.d.ts]
declare const s: unique symbol;
interface I {
    readonly readonlyType: unique symbol;
}
export declare const obj: {
    method1(p: typeof s): typeof s;
    method2(p: I["readonlyType"]): I["readonlyType"];
};
export declare const classExpression: invalid;
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
export type TypeLiteralWithPrivateNamedProperties = {
    [s]: any;
};
export type TypeLiteralWithPrivateNamedMethods = {
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
//# sourceMappingURL=uniqueSymbolsDeclarationsErrors.d.ts.map
/// [Errors] ////

uniqueSymbolsDeclarationsErrors.ts(15,32): error TS9011: Declaration emit for class expressions are not supported with --isolatedDeclarations.


==== uniqueSymbolsDeclarationsErrors.ts (1 errors) ====
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
                                   ~~~~~
!!! error TS9011: Declaration emit for class expressions are not supported with --isolatedDeclarations.
        method1(p: typeof s): typeof s {
            return p;
        }
        method2(p: I["readonlyType"]): I["readonlyType"] {
            return p;
        }
    };
    
    export function funcInferredReturnType(obj: { method(p: typeof s): void }): {
        method(p: typeof s): void;
    } {
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
        [s](): void {}
        static [s](): void {}
    }
    
    export class ClassWithPrivateNamedAccessors {
        get [s](): any { return undefined; }
        set [s](v: any) { }
        static get [s](): any { return undefined; }
        static set [s](v: any) { }
    }