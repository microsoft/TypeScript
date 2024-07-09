// @declaration: true
// @filename: file1.ts
export class Foo {}
// @filename: file2.ts
export function foo(): import("./file1").Foo {
    return null as any;
}
// @filename: file3.ts
import {foo} from "./file2";
export function bar() {
    return foo();
}
