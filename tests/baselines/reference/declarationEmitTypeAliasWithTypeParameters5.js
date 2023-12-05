//// [tests/cases/compiler/declarationEmitTypeAliasWithTypeParameters5.ts] ////

//// [declarationEmitTypeAliasWithTypeParameters5.ts]
type Foo<T, Y> = {
    foo<U, J>(): Foo<U, J>
};
export type SubFoo<R> = Foo<string, R>;

function foo() {
    return {} as SubFoo<number>;
}


//// [declarationEmitTypeAliasWithTypeParameters5.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function foo() {
    return {};
}


//// [declarationEmitTypeAliasWithTypeParameters5.d.ts]
type Foo<T, Y> = {
    foo<U, J>(): Foo<U, J>;
};
export type SubFoo<R> = Foo<string, R>;
export {};
