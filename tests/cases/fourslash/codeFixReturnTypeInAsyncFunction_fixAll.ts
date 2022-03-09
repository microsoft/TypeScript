/// <reference path='fourslash.ts' />

// @target: es2015
////declare class Thenable { then(): void; }
////interface Foo<T> {}
////type Bar = "a" | "b";
////
////async function f1(): number {}
////async function f2(): boolean {}
////async function f3(): string {}
////async function f4(): void {}
////async function f5(): null {}
////async function f6(): undefined {}
////async function f7(): any {}
////async function f8(): symbol {}
////
////async function f9(): Foo<number> {}
////async function f10(): Bar {}
////async function f11(): PromiseLike<string> {}
////async function f12(): PromiseLike<void> {}
////async function f13(): Thenable {}
////
////async function f14(): string | symbol {}


verify.codeFixAll({
    fixId: "fixReturnTypeInAsyncFunction",
    fixAllDescription: ts.Diagnostics.Fix_all_incorrect_return_type_of_an_async_functions.message,
    newFileContent:
`declare class Thenable { then(): void; }
interface Foo<T> {}
type Bar = "a" | "b";

async function f1(): Promise<number> {}
async function f2(): Promise<boolean> {}
async function f3(): Promise<string> {}
async function f4(): Promise<void> {}
async function f5(): Promise<null> {}
async function f6(): Promise<undefined> {}
async function f7(): Promise<any> {}
async function f8(): Promise<symbol> {}

async function f9(): Promise<Foo<number>> {}
async function f10(): Promise<Bar> {}
async function f11(): Promise<string> {}
async function f12(): Promise<void> {}
async function f13(): Promise<void> {}

async function f14(): Promise<string | symbol> {}`
});
