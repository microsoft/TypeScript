// @strict: true
// @declaration: true

// @filename: local.ts
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

// @filename: growing.ts
export function grow<T extends object>(value: T) {
    return {
        value,
        deeper: <U extends object>(next: U) => grow<T & U>({ ...value, ...next }),
    };
}

// @filename: annotatedLocal.ts
interface Recursive {
    (): Recursive;
}
export function local(): Recursive {
    const inner = () => inner;
    return inner;
}

// @filename: recursiveMappedResolve.ts
// https://github.com/microsoft/TypeScript/issues/64656
type show<t> = { [k in keyof t]: t[k] } & unknown;
type resolve<$, k extends keyof $> = show<{
    [p in keyof $[k]]: $[k][p] extends "ref" ? resolve<$, k> : $[k][p]
}>;
declare const mod: <$>() => { [k in keyof $]: resolve<$, k> };
export const n = mod<{ Node: { value: number; next: "ref" } }>();

// @filename: yieldableErrors.ts
// https://github.com/microsoft/TypeScript/issues/64656
export interface Effect<A, E> {
    readonly variance: (_: never) => E;
}
export declare function YieldableError<Self>(): new () => Effect<never, Self> & { readonly _tag: string };
class NotFound extends YieldableError<NotFound>() {}
export const endpoint = { error: NotFound };

// @filename: yieldableClient.ts
import { endpoint } from "./yieldableErrors";
declare function client<T>(t: T): { readonly call: () => T };
export const api = client(endpoint);

// @filename: selfGetter.ts
// https://github.com/microsoft/TypeScript/issues/65331
export const x = {
    data: 1,
    get self() {
        return x;
    },
};

// @filename: deepMapped.ts
// https://github.com/kestra-io/kestra/pull/22375
type Deep<T> = T extends object ? { [K in keyof T]: Deep<T[K]> } : T;
declare function wrap<T>(value: T): { value: Deep<T> };
export type Node = { child?: Node };
export function make() {
    return wrap<Node>({});
}

// @filename: mappable.ts
// https://github.com/ddd-ts/monorepo/pull/98
declare function map<T, U>(iterable: AsyncIterable<T>, fn: (value: T) => U): AsyncGenerator<Awaited<U>, void, unknown>;
export function mappable<T extends AsyncIterable<any>, U>(iterable: T) {
    return Object.assign(iterable, {
        map(fn: (value: T extends AsyncIterable<infer V> ? V : never) => U) {
            return mappable(map(iterable, fn));
        },
    });
}

// @filename: either.ts
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

// @filename: expand.ts
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
