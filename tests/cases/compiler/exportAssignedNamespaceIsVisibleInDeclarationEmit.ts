// @declaration: true
// @filename: thing.d.ts
declare namespace Foo {
    export interface Bar {}
    export function f(): Bar;
}
export = Foo;
// @filename: index.ts
import { f } from "./thing";
export const thing = f();