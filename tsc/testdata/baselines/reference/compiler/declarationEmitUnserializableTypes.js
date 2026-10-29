//// [tests/cases/compiler/declarationEmitUnserializableTypes.ts] ////

//// [local.ts]
export function localArrow() {
    const inner = () => inner;
    return inner;
}
export function localDeclaration() {
    function inner() { return inner; }
    return inner;
}
export function localInstantiation() {
    function inner<T>(): typeof inner<T> { return inner<T>; }
    return inner<number>;
}
export const object = {
    self() { return object; }
};
export const annotatedObject: { self(): typeof annotatedObject } = {
    self() { return annotatedObject; }
};

//// [growing.ts]
export function grow<T extends object>(value: T) {
    return {
        value,
        deeper: <U extends object>(next: U) => grow<T & U>({ ...value, ...next }),
    };
}

//// [annotatedLocal.ts]
interface Recursive {
    (): Recursive;
}
export function local(): Recursive {
    const inner = () => inner;
    return inner;
}

//// [recursiveMappedResolve.ts]
// https://github.com/microsoft/TypeScript/issues/64656
type show<t> = { [k in keyof t]: t[k] } & unknown;
type resolve<$, k extends keyof $> = show<{
    [p in keyof $[k]]: $[k][p] extends "ref" ? resolve<$, k> : $[k][p]
}>;
declare const mod: <$>() => { [k in keyof $]: resolve<$, k> };
export const n = mod<{ Node: { value: number; next: "ref" } }>();

//// [yieldableErrors.ts]
// https://github.com/microsoft/TypeScript/issues/64656
export interface Effect<A, E> {
    readonly variance: (_: never) => E;
}
export declare function YieldableError<Self>(): new () => Effect<never, Self> & { readonly _tag: string };
class NotFound extends YieldableError<NotFound>() {}
export const endpoint = { error: NotFound };

//// [yieldableClient.ts]
import { endpoint } from "./yieldableErrors";
declare function client<T>(t: T): { readonly call: () => T };
export const api = client(endpoint);

//// [selfGetter.ts]
// https://github.com/microsoft/TypeScript/issues/65331
export const x = {
    data: 1,
    get self() {
        return x;
    },
};

//// [deepMapped.ts]
// https://github.com/kestra-io/kestra/pull/22375
type Deep<T> = T extends object ? { [K in keyof T]: Deep<T[K]> } : T;
declare function wrap<T>(value: T): { value: Deep<T> };
export type Node = { child?: Node };
export function make() {
    return wrap<Node>({});
}

//// [mappable.ts]
// https://github.com/ddd-ts/monorepo/pull/98
declare function map<T, U>(iterable: AsyncIterable<T>, fn: (value: T) => U): AsyncGenerator<Awaited<U>, void, unknown>;
export function mappable<T extends AsyncIterable<any>, U>(iterable: T) {
    return Object.assign(iterable, {
        map(fn: (value: T extends AsyncIterable<infer V> ? V : never) => U) {
            return mappable(map(iterable, fn));
        },
    });
}

//// [either.ts]
// https://github.com/ddd-ts/monorepo/pull/98
export const Either = <Inline>() => {
    class $Either {
        constructor(public value: Inline) {}
        static deserialize<T extends typeof $Either>(this: T, value: Inline): InstanceType<T> {
            return new this(this.$deserialize(value)) as InstanceType<T>;
        }
        static $deserialize<T extends typeof $Either>(this: T, value: Inline): Inline {
            return value;
        }
    }
    return $Either;
};
export class StringOrNumber extends Either<string | number>() {}

//// [expand.ts]
// https://github.com/ddd-ts/monorepo/pull/98
type Expand<T> = T extends { serialize(): any }
    ? T
    : T extends Date
        ? T
        : T extends Record<string, any>
            ? { [key in keyof T]: Expand<T[key]> }
            : T;
interface TreeNode {
    name: string;
    children?: TreeNode[];
}
declare function Dict<S>(): {
    new (value: S): { serialize(): Expand<S> };
    deserialize(value: Expand<S>): S;
};
export class Tree extends Dict<TreeNode>() {}


//// [local.js]
export function localArrow() {
    const inner = () => inner;
    return inner;
}
export function localDeclaration() {
    function inner() { return inner; }
    return inner;
}
export function localInstantiation() {
    function inner() { return inner; }
    return inner;
}
export const object = {
    self() { return object; }
};
export const annotatedObject = {
    self() { return annotatedObject; }
};
//// [growing.js]
export function grow(value) {
    return {
        value,
        deeper: (next) => grow({ ...value, ...next }),
    };
}
//// [annotatedLocal.js]
export function local() {
    const inner = () => inner;
    return inner;
}
//// [recursiveMappedResolve.js]
export const n = mod();
//// [yieldableErrors.js]
class NotFound extends YieldableError() {
}
export const endpoint = { error: NotFound };
//// [yieldableClient.js]
import { endpoint } from "./yieldableErrors";
export const api = client(endpoint);
//// [selfGetter.js]
// https://github.com/microsoft/TypeScript/issues/65331
export const x = {
    data: 1,
    get self() {
        return x;
    },
};
//// [deepMapped.js]
export function make() {
    return wrap({});
}
//// [mappable.js]
export function mappable(iterable) {
    return Object.assign(iterable, {
        map(fn) {
            return mappable(map(iterable, fn));
        },
    });
}
//// [either.js]
// https://github.com/ddd-ts/monorepo/pull/98
export const Either = () => {
    class $Either {
        value;
        constructor(value) {
            this.value = value;
        }
        static deserialize(value) {
            return new this(this.$deserialize(value));
        }
        static $deserialize(value) {
            return value;
        }
    }
    return $Either;
};
export class StringOrNumber extends Either() {
}
//// [expand.js]
export class Tree extends Dict() {
}


//// [local.d.ts]
export declare function localArrow(): () => /*elided*/ any;
export declare function localDeclaration(): () => /*elided*/ any;
export declare function localInstantiation(): () => () => /*elided*/ any;
export declare const object: {
    self(): {
        self(): /*elided*/ any;
    };
};
export declare const annotatedObject: {
    self(): typeof annotatedObject;
};
//// [growing.d.ts]
export declare function grow<T extends object>(value: T): {
    value: T;
    deeper: <U extends object>(next: U) => {
        value: T & U;
        deeper: <U_1 extends object>(next: U_1) => {
            value: T & U & U_1;
            deeper: <U_2 extends object>(next: U_2) => {
                value: T & U & U_1 & U_2;
                deeper: <U_3 extends object>(next: U_3) => {
                    value: T & U & U_1 & U_2 & U_3;
                    deeper: <U_4 extends object>(next: U_4) => {
                        value: T & U & U_1 & U_2 & U_3 & U_4;
                        deeper: <U_5 extends object>(next: U_5) => {
                            value: T & U & U_1 & U_2 & U_3 & U_4 & U_5;
                            deeper: <U_6 extends object>(next: U_6) => {
                                value: T & U & U_1 & U_2 & U_3 & U_4 & U_5 & U_6;
                                deeper: <U_7 extends object>(next: U_7) => {
                                    value: T & U & U_1 & U_2 & U_3 & U_4 & U_5 & U_6 & U_7;
                                    deeper: <U_8 extends object>(next: U_8) => {
                                        value: T & U & U_1 & U_2 & U_3 & U_4 & U_5 & U_6 & U_7 & U_8;
                                        deeper: <U_9 extends object>(next: U_9) => {
                                            value: T & U & U_1 & U_2 & U_3 & U_4 & U_5 & U_6 & U_7 & U_8 & U_9;
                                            deeper: <U_10 extends object>(next: U_10) => /*elided*/ any;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};
//// [annotatedLocal.d.ts]
interface Recursive {
    (): Recursive;
}
export declare function local(): Recursive;
export {};
//// [recursiveMappedResolve.d.ts]
export declare const n: {
    Node: {
        value: number;
        next: /*elided*/ any;
    };
};
//// [yieldableErrors.d.ts]
export interface Effect<A, E> {
    readonly variance: (_: never) => E;
}
export declare function YieldableError<Self>(): new () => Effect<never, Self> & {
    readonly _tag: string;
};
declare const NotFound_base: new () => Effect<never, NotFound> & {
    readonly _tag: string;
};
declare class NotFound extends NotFound_base {
}
export declare const endpoint: {
    error: typeof NotFound;
};
export {};
//// [yieldableClient.d.ts]
export declare const api: {
    readonly call: () => {
        error: {
            new (): {
                readonly variance: (_: never) => /*elided*/ any;
                readonly _tag: string;
            };
        };
    };
};
//// [selfGetter.d.ts]
export declare const x: {
    data: number;
    readonly self: {
        data: number;
        readonly self: /*elided*/ any;
    };
};
//// [deepMapped.d.ts]
export type Node = {
    child?: Node;
};
export declare function make(): {
    value: {
        child?: /*elided*/ any | undefined;
    };
};
//// [mappable.d.ts]
export declare function mappable<T extends AsyncIterable<any>, U>(iterable: T): T & {
    map(fn: (value: T extends AsyncIterable<infer V> ? V : never) => U): AsyncGenerator<Awaited<U>, void, unknown> & {
        map(fn: (value: void | not {
            then(): any;
        }) => unknown): AsyncGenerator<Awaited<U>, void, unknown> & /*elided*/ any;
    };
};
//// [either.d.ts]
export declare const Either: <Inline>() => {
    new (value: Inline): {
        value: Inline;
    };
    deserialize<T extends /*elided*/ any>(this: T, value: Inline): InstanceType<T>;
    $deserialize<T extends /*elided*/ any>(this: T, value: Inline): Inline;
};
declare const StringOrNumber_base: {
    new (value: string | number): {
        value: string | number;
    };
    deserialize<T extends /*elided*/ any>(this: T, value: string | number): InstanceType<T>;
    $deserialize<T extends /*elided*/ any>(this: T, value: string | number): string | number;
};
export declare class StringOrNumber extends StringOrNumber_base {
}
export {};
//// [expand.d.ts]
interface TreeNode {
    name: string;
    children?: TreeNode[];
}
declare const Tree_base: {
    new (value: TreeNode): {
        serialize(): {
            name: string;
            children?: /*elided*/ any[] | undefined;
        };
    };
    deserialize(value: {
        name: string;
        children?: /*elided*/ any[] | undefined;
    }): TreeNode;
};
export declare class Tree extends Tree_base {
}
export {};


//// [DtsFileErrors]


either.d.ts(5,81): error TS2344: Type 'T' does not satisfy the constraint 'abstract new (...args: any) => any'.
either.d.ts(12,90): error TS2344: Type 'T' does not satisfy the constraint 'abstract new (...args: any) => any'.


==== local.d.ts (0 errors) ====
    export declare function localArrow(): () => /*elided*/ any;
    export declare function localDeclaration(): () => /*elided*/ any;
    export declare function localInstantiation(): () => () => /*elided*/ any;
    export declare const object: {
        self(): {
            self(): /*elided*/ any;
        };
    };
    export declare const annotatedObject: {
        self(): typeof annotatedObject;
    };
    
==== growing.d.ts (0 errors) ====
    export declare function grow<T extends object>(value: T): {
        value: T;
        deeper: <U extends object>(next: U) => {
            value: T & U;
            deeper: <U_1 extends object>(next: U_1) => {
                value: T & U & U_1;
                deeper: <U_2 extends object>(next: U_2) => {
                    value: T & U & U_1 & U_2;
                    deeper: <U_3 extends object>(next: U_3) => {
                        value: T & U & U_1 & U_2 & U_3;
                        deeper: <U_4 extends object>(next: U_4) => {
                            value: T & U & U_1 & U_2 & U_3 & U_4;
                            deeper: <U_5 extends object>(next: U_5) => {
                                value: T & U & U_1 & U_2 & U_3 & U_4 & U_5;
                                deeper: <U_6 extends object>(next: U_6) => {
                                    value: T & U & U_1 & U_2 & U_3 & U_4 & U_5 & U_6;
                                    deeper: <U_7 extends object>(next: U_7) => {
                                        value: T & U & U_1 & U_2 & U_3 & U_4 & U_5 & U_6 & U_7;
                                        deeper: <U_8 extends object>(next: U_8) => {
                                            value: T & U & U_1 & U_2 & U_3 & U_4 & U_5 & U_6 & U_7 & U_8;
                                            deeper: <U_9 extends object>(next: U_9) => {
                                                value: T & U & U_1 & U_2 & U_3 & U_4 & U_5 & U_6 & U_7 & U_8 & U_9;
                                                deeper: <U_10 extends object>(next: U_10) => /*elided*/ any;
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    };
    
==== annotatedLocal.d.ts (0 errors) ====
    interface Recursive {
        (): Recursive;
    }
    export declare function local(): Recursive;
    export {};
    
==== recursiveMappedResolve.d.ts (0 errors) ====
    export declare const n: {
        Node: {
            value: number;
            next: /*elided*/ any;
        };
    };
    
==== yieldableErrors.d.ts (0 errors) ====
    export interface Effect<A, E> {
        readonly variance: (_: never) => E;
    }
    export declare function YieldableError<Self>(): new () => Effect<never, Self> & {
        readonly _tag: string;
    };
    declare const NotFound_base: new () => Effect<never, NotFound> & {
        readonly _tag: string;
    };
    declare class NotFound extends NotFound_base {
    }
    export declare const endpoint: {
        error: typeof NotFound;
    };
    export {};
    
==== yieldableClient.d.ts (0 errors) ====
    export declare const api: {
        readonly call: () => {
            error: {
                new (): {
                    readonly variance: (_: never) => /*elided*/ any;
                    readonly _tag: string;
                };
            };
        };
    };
    
==== selfGetter.d.ts (0 errors) ====
    export declare const x: {
        data: number;
        readonly self: {
            data: number;
            readonly self: /*elided*/ any;
        };
    };
    
==== deepMapped.d.ts (0 errors) ====
    export type Node = {
        child?: Node;
    };
    export declare function make(): {
        value: {
            child?: /*elided*/ any | undefined;
        };
    };
    
==== mappable.d.ts (0 errors) ====
    export declare function mappable<T extends AsyncIterable<any>, U>(iterable: T): T & {
        map(fn: (value: T extends AsyncIterable<infer V> ? V : never) => U): AsyncGenerator<Awaited<U>, void, unknown> & {
            map(fn: (value: void | not {
                then(): any;
            }) => unknown): AsyncGenerator<Awaited<U>, void, unknown> & /*elided*/ any;
        };
    };
    
==== either.d.ts (2 errors) ====
    export declare const Either: <Inline>() => {
        new (value: Inline): {
            value: Inline;
        };
        deserialize<T extends /*elided*/ any>(this: T, value: Inline): InstanceType<T>;
                                                                                    ~
!!! error TS2344: Type 'T' does not satisfy the constraint 'abstract new (...args: any) => any'.
        $deserialize<T extends /*elided*/ any>(this: T, value: Inline): Inline;
    };
    declare const StringOrNumber_base: {
        new (value: string | number): {
            value: string | number;
        };
        deserialize<T extends /*elided*/ any>(this: T, value: string | number): InstanceType<T>;
                                                                                             ~
!!! error TS2344: Type 'T' does not satisfy the constraint 'abstract new (...args: any) => any'.
        $deserialize<T extends /*elided*/ any>(this: T, value: string | number): string | number;
    };
    export declare class StringOrNumber extends StringOrNumber_base {
    }
    export {};
    
==== expand.d.ts (0 errors) ====
    interface TreeNode {
        name: string;
        children?: TreeNode[];
    }
    declare const Tree_base: {
        new (value: TreeNode): {
            serialize(): {
                name: string;
                children?: /*elided*/ any[] | undefined;
            };
        };
        deserialize(value: {
            name: string;
            children?: /*elided*/ any[] | undefined;
        }): TreeNode;
    };
    export declare class Tree extends Tree_base {
    }
    export {};
    