// @target: esnext
// @strict: true
// @useDefineForClassFields: false

export interface SomethingTaggable {
    <T>(t: TemplateStringsArray, ...args: T[]): SomethingNewable;
}

export interface SomethingNewable {
    new <T>(...args: T[]): any;
}

declare const tag: SomethingTaggable;

const a = new tag `${100} ${200}`<string>("hello", "world");

const b = new tag<number> `${"hello"} ${"world"}`(100, 200);

const c = new tag<number> `${100} ${200}`<string>("hello", "world");

const d = new tag<number> `${"hello"} ${"world"}`<string>(100, 200);

/**
 * Testing ASI. This should never parse as
 *
 * ```ts
 * new tag<number>;
 * `hello${369}`();
 * ```
 */
const e = new tag<number>
`hello`();

class SomeBase<A, B, C> {
    a!: A; b!: B; c!: C;
}

class SomeDerived<T> extends SomeBase<number, string, T> {
    constructor() {
        super<number, string, T> `hello world`;
    }
}