// @inlineSourceMap: true,false
// @target: es6
// @filename: variables.ts
export const a = 1;
export let b = 2;
export var c = 3;
using d = undefined;
export { d };
await using e = undefined;
export { e };
// @filename: interface.ts
export interface Foo {
    a: string;
    readonly b: string;
    c?: string;
}
// @filename: class.ts
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
// @filename: namespace.ts
export namespace ns {
    namespace internal {
        export class Foo {}
    }
    export namespace nested {
        export import inner = internal;
    }
}
// @filename: alias.ts
export type A<T> = { x: T };