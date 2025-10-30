//// [variables.ts] ////
export const a = 1;
export let b = 2;
export var c = 3;
using d = undefined;
export { d };
await using e = undefined;
export { e };
//// [interface.ts] ////
export interface Foo {
    a: string;
    readonly b: string;
    c?: string;
}
//// [class.ts] ////
const i = Symbol();
export class Bar {
    a: string;
    b?: string;
    declare c: string;
    #d: string;
    public e: string;
    protected f: string;
    private g: string;
    ["h"]: string;
    [i]: string;
}

export abstract class Baz {
    abstract a: string;
    abstract method(): void;
}
//// [namespace.ts] ////
export namespace ns {
    namespace internal {
        export class Foo {}
    }
    export namespace nested {
        export import inner = internal;
    }
}
//// [alias.ts] ////
export type A<T> = { x: T };
//// [variables.d.ts] ////
export declare const a = 1;
export declare let b: number;
export declare var c: number;
declare const d: any;
export { d };
declare const e: any;
export { e };
//// [interface.d.ts] ////
export interface Foo {
    a: string;
    readonly b: string;
    c?: string;
}
//// [class.d.ts] ////
export declare class Bar {
    #private;
    a: string;
    b?: string;
    c: string;
    e: string;
    protected f: string;
    private g;
    ["h"]: string;
}
export declare abstract class Baz {
    abstract a: string;
    abstract method(): void;
}


//// [Diagnostics reported]
class.ts(11,5): error TS9038: Computed property names on class or object literals cannot be inferred with --isolatedDeclarations.


==== class.ts (1 errors) ====
    const i = Symbol();
    export class Bar {
        a: string;
        b?: string;
        declare c: string;
        #d: string;
        public e: string;
        protected f: string;
        private g: string;
        ["h"]: string;
        [i]: string;
        ~~~
!!! error TS9038: Computed property names on class or object literals cannot be inferred with --isolatedDeclarations.
    }
    
    export abstract class Baz {
        abstract a: string;
        abstract method(): void;
    }
//// [namespace.d.ts] ////
export declare namespace ns {
    namespace internal {
        class Foo {
        }
    }
    export namespace nested {
        export import inner = internal;
    }
    export {};
}
//// [alias.d.ts] ////
export type A<T> = {
    x: T;
};
