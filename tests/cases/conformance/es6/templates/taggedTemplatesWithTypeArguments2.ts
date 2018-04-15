// @target: esnext
// @strict: true

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
