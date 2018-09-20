// @filename: file1.ts
export namespace Library {
    export type Bar = { a: number };
}
var x: Library.Bar; // should work
Library.foo; // should be an error
// @filename: file2.ts
import * as Lib from './file1';
namespace Lib { // should fail to merge
    export const foo: string = "";
}
Lib.foo; // should work
var x: Lib.Bar; // should be an error
export { Lib }