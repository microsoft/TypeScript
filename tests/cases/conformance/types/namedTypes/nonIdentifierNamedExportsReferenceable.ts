// @filename: a.ts
export enum Foo {
    "1-1",
    "1-2"
}
// @filename: b.ts
import {Foo} from "./a";

export type FooFirst = Foo."1-1";

export type FirstFoo = import("./a").Foo."1-1";
