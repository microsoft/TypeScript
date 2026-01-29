//// [tests/cases/compiler/declarationsForInferredTypeFromOtherFile.ts] ////

//// [file1.ts]
export class Foo {}
//// [file2.ts]
export function foo(): import("./file1").Foo {
    return null as any;
}
//// [file3.ts]
import {foo} from "./file2";
export function bar() {
    return foo();
}


//// [file1.js]
export class Foo {
}
//// [file2.js]
export function foo() {
    return null;
}
//// [file3.js]
import { foo } from "./file2";
export function bar() {
    return foo();
}


//// [file1.d.ts]
export declare class Foo {
}
//// [file2.d.ts]
export declare function foo(): import("./file1").Foo;
//// [file3.d.ts]
export declare function bar(): import("./file1").Foo;
