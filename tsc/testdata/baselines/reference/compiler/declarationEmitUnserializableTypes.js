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


//// [annotatedLocal.d.ts]
interface Recursive {
    (): Recursive;
}
export declare function local(): Recursive;
export {};
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
